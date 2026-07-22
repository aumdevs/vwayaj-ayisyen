#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const manifestPath = resolve(root, "manifest.json");
const checksumsPath = resolve(root, "SHA256SUMS.txt");

function safePath(relativePath) {
  if (relativePath.startsWith("/") || relativePath.split("/").includes("..")) {
    throw new Error(`Unsafe integrity path: ${relativePath}`);
  }

  const absolutePath = resolve(root, relativePath);
  if (!absolutePath.startsWith(`${root}${sep}`)) {
    throw new Error(`Integrity path escapes repository: ${relativePath}`);
  }
  return absolutePath;
}

function sha256(relativePath) {
  return createHash("sha256")
    .update(readFileSync(safePath(relativePath)))
    .digest("hex");
}

function assertUnique(paths, label) {
  if (new Set(paths).size !== paths.length) {
    throw new Error(`${label} contains duplicate paths`);
  }
}

function hasSameMembers(actualPaths, expectedPaths) {
  const actual = new Set(actualPaths);
  return actual.size === expectedPaths.length && expectedPaths.every((path) => actual.has(path));
}

const manifestSource = readFileSync(manifestPath, "utf8");
const manifest = JSON.parse(manifestSource);
const indexSource = readFileSync(safePath("FILE_INDEX.md"), "utf8");
const indexedPaths = [...indexSource.matchAll(/^- `([^`\n]+)`.*$/gm)].map((match) => match[1]);
assertUnique(indexedPaths, "FILE_INDEX.md");

// FILE_INDEX.md lists every other package member, including both generated
// integrity files. Add the index itself to obtain the authoritative path set.
const authoritativePaths = [...indexedPaths, "FILE_INDEX.md"];
assertUnique(authoritativePaths, "Authoritative package inventory");
if (authoritativePaths.length !== manifest.package_expected_file_count) {
  throw new Error(
    `FILE_INDEX.md declares ${authoritativePaths.length} package files; expected ${manifest.package_expected_file_count}`
  );
}
for (const relativePath of authoritativePaths) statSync(safePath(relativePath));

const excludedPaths = manifest.manifest_excludes;
assertUnique(excludedPaths, "manifest_excludes");
if (!excludedPaths.includes("manifest.json") || !excludedPaths.includes("SHA256SUMS.txt")) {
  throw new Error("manifest_excludes must contain manifest.json and SHA256SUMS.txt");
}
if (excludedPaths.some((path) => !authoritativePaths.includes(path))) {
  throw new Error("manifest_excludes contains a path outside FILE_INDEX.md");
}

const expectedManifestPaths = authoritativePaths.filter((path) => !excludedPaths.includes(path));
const currentManifestPaths = manifest.files.map(({ path }) => path);
assertUnique(currentManifestPaths, "manifest.json files");
if (checkOnly && !hasSameMembers(currentManifestPaths, expectedManifestPaths)) {
  throw new Error("manifest.json membership differs from FILE_INDEX.md");
}
const manifestPaths = checkOnly
  ? currentManifestPaths
  : [
      ...currentManifestPaths.filter((path) => expectedManifestPaths.includes(path)),
      ...expectedManifestPaths.filter((path) => !currentManifestPaths.includes(path))
    ];
const refreshedManifest = {
  ...manifest,
  generated_at: checkOnly ? manifest.generated_at : new Date().toISOString().slice(0, 10),
  files: manifestPaths.map((path) => ({
    path,
    size_bytes: statSync(safePath(path)).size,
    sha256: sha256(path)
  }))
};
const nextManifestSource = `${JSON.stringify(refreshedManifest, null, 2)}\n`;

if (checkOnly && nextManifestSource !== manifestSource) {
  throw new Error("manifest.json contains stale file sizes or hashes");
}
if (!checkOnly) writeFileSync(manifestPath, nextManifestSource);

const checksumSource = readFileSync(checksumsPath, "utf8");
const checksumPaths = checksumSource
  .trimEnd()
  .split("\n")
  .map((line) => {
    const match = line.match(/^[a-f0-9]{64}  (.+)$/);
    if (!match?.[1]) throw new Error(`Invalid SHA256SUMS entry: ${line}`);
    return match[1];
  });
assertUnique(checksumPaths, "SHA256SUMS.txt");
const expectedChecksumPaths = authoritativePaths.filter((path) => path !== "SHA256SUMS.txt");
if (checkOnly && !hasSameMembers(checksumPaths, expectedChecksumPaths)) {
  throw new Error("SHA256SUMS.txt membership differs from FILE_INDEX.md");
}
const refreshedChecksumPaths = checkOnly
  ? checksumPaths
  : [
      ...checksumPaths.filter((path) => expectedChecksumPaths.includes(path)),
      ...expectedChecksumPaths.filter((path) => !checksumPaths.includes(path))
    ];
const nextChecksumSource = `${refreshedChecksumPaths
  .map((relativePath) => `${sha256(relativePath)}  ${relativePath}`)
  .join("\n")}\n`;

if (checkOnly && nextChecksumSource !== checksumSource) {
  throw new Error("SHA256SUMS.txt contains stale hashes");
}
if (!checkOnly) writeFileSync(checksumsPath, nextChecksumSource);

console.log(
  checkOnly
    ? `Package integrity verified for ${refreshedManifest.files.length} manifest entries and ${refreshedChecksumPaths.length} checksums.`
    : `Package integrity refreshed for ${refreshedManifest.files.length} manifest entries and ${refreshedChecksumPaths.length} checksums.`
);
