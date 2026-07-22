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

const manifestSource = readFileSync(manifestPath, "utf8");
const manifest = JSON.parse(manifestSource);
const refreshedManifest = {
  ...manifest,
  generated_at: checkOnly ? manifest.generated_at : new Date().toISOString().slice(0, 10),
  files: manifest.files.map(({ path }) => ({
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
const nextChecksumSource = `${checksumPaths
  .map((relativePath) => `${sha256(relativePath)}  ${relativePath}`)
  .join("\n")}\n`;

if (checkOnly && nextChecksumSource !== checksumSource) {
  throw new Error("SHA256SUMS.txt contains stale hashes");
}
if (!checkOnly) writeFileSync(checksumsPath, nextChecksumSource);

console.log(
  checkOnly
    ? `Package integrity verified for ${refreshedManifest.files.length} manifest entries and ${checksumPaths.length} checksums.`
    : `Package integrity refreshed for ${refreshedManifest.files.length} manifest entries and ${checksumPaths.length} checksums.`
);
