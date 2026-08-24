# Vwayaj Ayisyen

[Vwayaj Ayisyen](https://vwayajayisyen.com) se yon aplikasyon entènèt piblik pou
kominote ayisyèn nan jwenn sous ofisyèl sou viza, anbasad, imigrasyon, dokiman,
travay, etid ak sante.

Sit la disponib an kreyòl ayisyen, fransè, panyòl, pòtigè ak anglè. Kreyòl se
lang prensipal la.

## Sa ki disponib

- 32 lyen ofisyèl, revize 24 out 2026;
- gid pou Etazini, Chili, Brezil ak Meksik;
- yon chemen senp pou jwenn otorite ki responsab la;
- enstalasyon sou telefòn kòm PWA ak paj piblik ki disponib offline;
- okenn kont, koneksyon, peman oswa telechajman dokiman.

Sit la pa vann viza oswa randevou, li pa reprezante okenn gouvènman epi li pa
garanti yon rezilta. Toujou verifye kondisyon aktyèl yo sou paj otorite a anvan
ou aji.

## Devlopman

Node 24 ak pnpm 11 obligatwa.

```bash
pnpm install --frozen-lockfile
pnpm check:all
pnpm test:e2e
```

Konfigirasyon piblik lokal la dokimante nan `.env.example`.

## Sekirite ak lisans

Pa mete sekrè, dokiman pèsonèl oswa done migrasyon nan issues. Pou rapòte yon
pwoblèm sekirite, itilize GitHub Security Advisories.

Repozitwa a piblik men kòd la rete anba lisans pwopriyetè ki nan
[`LICENSE`](LICENSE).

Gade [`docs/49_PUBLIC_INFORMATION_RELEASE_2026-08-24.md`](docs/49_PUBLIC_INFORMATION_RELEASE_2026-08-24.md)
pou dimansyon aktyèl la ak verifikasyon lansman an.
