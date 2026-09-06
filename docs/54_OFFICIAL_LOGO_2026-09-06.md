# Official globe logo rollout

## Scope

Replace the former hexagonal compass mark with the user-supplied blue globe,
aircraft and Vwayaj Ayisyen wordmark. The full logo sits on white in the mobile
home header, splash and footer. The transparent symbol serves compact headers,
onboarding, account notices, installation and system-state pages. Open Graph,
favicons, Apple touch icons and PWA icons use the same identity.

## Assets

- `public/images/brand/logo-white.png`: full logo on white.
- `public/images/brand/logo-transparent.png`: full logo with real alpha.
- `public/images/brand/symbol-transparent.png`: compact globe/aircraft symbol.
- `public/images/brand/logo-master.png`: background-extraction source for exports.
- `scripts/export-brand-assets.mjs`: reproducible resizing, padding and OS exports.

The supplied raster was processed with the built-in imagegen background-extraction
tool, not a new logo design. The prompt required: remove only the outer paper
background; preserve the blue gradient globe, continents, map pin, orbit,
aircraft and exact “Vwayaj Ayisyen” wordmark; retain white interior details;
produce true transparency, with no restyling, shadow, added copy or checkerboard.
Exports were visually checked on white. This remains a raster identity, not a
newly traced vector logo. Compatibility SVG URLs embed those exact PNG exports.
Monochrome silhouettes exist only for OS notification requirements.

## Validation

Unit tests verify real transparency, a white opaque alternative, maskable safe
margins, icon dimensions and replacement of the old SVG geometry. Browser tests
check logo loading, public navigation and onboarding. Refreshed install previews:

- [Mobile home](../public/screenshots/pwa/home-mobile.png)
- [Chile guide](../public/screenshots/pwa/country-mobile.png)
- [Tablet home](../public/screenshots/pwa/home-tablet.png)

No database, authentication, permission or environment-variable changes.
Service-worker cache v11 and versioned icon metadata refresh existing clients.
Installed launcher icons can refresh later according to the device's own policy.
Rollback: revert the logo rollout commit and deploy; no data rollback is needed.

## Header follow-up

Keep the transparent PNG logo and the original airplane side by side in the home
bar. Restore the yellow airplane beside page titles elsewhere. This preserves
the requested navigation decoration independently of the logo replacement.
Browser regression checks cover both elements and the single-screen home layout.
Cache v12 refreshes the updated header. No data, security or environment changes.
