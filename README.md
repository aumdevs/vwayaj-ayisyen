# Vwayaj Ayisyen

[Vwayaj Ayisyen](https://vwayajayisyen.com) se yon ajans dijital pou kominote
ayisyèn nan. Eksperyans piblik la konsantre sèlman sou Chili ak Brezil. Li
esplike chemen ki posib yo, sa pou prepare ak kote pou kòmanse demach ofisyèl
yo, epi li bay yon pòt pou mande ekip la èd sou WhatsApp lè sèvis sa a aktive.

Tout koòdone ak kontni piblik la disponib sèlman an kreyòl ayisyen.

## Sa ki disponib

- chwa ant Chili ak Brezil sou òdinatè;
- chwa peyi rezidans lan ant Ayiti, Repiblik Dominikèn, Chili, Brezil, Meksik
  ak Etazini, plis yon chemen limite pou lòt peyi;
- gid detaye pou Chili ak Brezil;
- opsyon pou travay, fanmi, etid, vizit ak pwoteksyon;
- preparasyon depi Ayiti, dokiman ak premye demach apre arive;
- dis nouvèl enpòtan prezante nan seksyon ki fasil pou li;
- yon eksperyans mobil tankou yon aplikasyon, ak splash, kat ekran akèy,
  koneksyon, pwofil ak enstalasyon PWA;
- koneksyon oswa enskripsyon nan yon sèl etap ak Google, pwofil pèsonèl,
  preferans notifikasyon ak nouvèl anrejistre, sèlman lè Firebase aktive.

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

Gade [`docs/51_MOBILE_AGENCY_EXPERIENCE_2026-09-04.md`](docs/51_MOBILE_AGENCY_EXPERIENCE_2026-09-04.md)
pou dimansyon aktyèl la, sekirite, deplwaman ak verifikasyon lansman an.
Entegrasyon kont Google la dokimante nan
[`docs/52_FIREBASE_GOOGLE_ACCOUNTS_2026-09-04.md`](docs/52_FIREBASE_GOOGLE_ACCOUNTS_2026-09-04.md).
