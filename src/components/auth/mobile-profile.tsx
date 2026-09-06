"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signOut } from "firebase/auth";
import {
  BellRing,
  Bookmark,
  Camera,
  ChevronRight,
  CircleHelp,
  Clock3,
  Mail,
  MessageCircle,
  Save,
  Settings,
  ShieldCheck,
  UserRound
} from "lucide-react";
import {
  mobileSignOutAction,
  updateMobileProfileAction,
  type ProfileActionState
} from "@/app/[locale]/auth/actions";
import { FirebaseGoogleButton } from "@/components/auth/firebase-google-button";
import { ACCOUNT_STATE_KEY } from "@/components/pwa/mobile-entry-gate";
import { RESIDENCE_COUNTRIES } from "@/content/agency";
import { localizedPath } from "@/lib/i18n/paths";
import { getFirebaseBrowserAuth } from "@/lib/firebase/client";
import type { MobileViewer } from "@/types/account";

const initialState: ProfileActionState = { status: "idle" };

async function prepareAvatar(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024)
    throw new Error("invalid-image");
  const bitmap = await createImageBitmap(file);
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas-unavailable");
  const side = Math.min(bitmap.width, bitmap.height);
  const x = (bitmap.width - side) / 2;
  const y = (bitmap.height - side) / 2;
  context.drawImage(bitmap, x, y, side, side, 0, 0, size, size);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.86)
  );
  if (!blob) throw new Error("image-processing-failed");
  return blob;
}

export function MobileProfile({
  accountsReady,
  viewer,
  avatarUrl,
  whatsappUrl
}: {
  accountsReady: boolean;
  viewer: MobileViewer | null;
  avatarUrl: string | null;
  whatsappUrl: string | null;
}) {
  const [state, formAction, pending] = useActionState(updateMobileProfileAction, initialState);
  const [preview, setPreview] = useState(avatarUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  if (!viewer) {
    return (
      <section className="mobile-profile-guest">
        <header className="mobile-profile-guest-header">
          <span aria-hidden="true">
            <UserRound size={30} />
          </span>
          <div>
            <h1>Kont ou</h1>
            <p>
              {accountsReady
                ? "Konekte pou jwenn espas pèsonèl ou."
                : "Espas pèsonèl ou ap vini byento."}
            </p>
          </div>
        </header>

        {accountsReady ? (
          <FirebaseGoogleButton enabled />
        ) : (
          <aside className="mobile-profile-coming-soon" role="status">
            <span aria-hidden="true">
              <Clock3 size={24} />
            </span>
            <div>
              <small>BYENTO</small>
              <strong>Kreyasyon kont poko disponib</strong>
              <p>
                Nou ap prepare kont Vwayaj Ayisyen yo. Pou kounye a, ou ka kontinye li tout gid ak
                enfòmasyon piblik yo san kont.
              </p>
            </div>
          </aside>
        )}

        <nav className="mobile-profile-options" aria-label="Opsyon pwofil">
          <button disabled type="button">
            <span aria-hidden="true">
              <Settings size={20} />
            </span>
            <div>
              <strong>Paramèt kont</strong>
              <small>Disponib byento</small>
            </div>
            <small className="mobile-profile-option-status">BYENTO</small>
          </button>
          <button disabled type="button">
            <span aria-hidden="true">
              <Bookmark size={20} />
            </span>
            <div>
              <strong>Enfòmasyon anrejistre</strong>
              <small>Disponib byento</small>
            </div>
            <small className="mobile-profile-option-status">BYENTO</small>
          </button>
          <button disabled type="button">
            <span aria-hidden="true">
              <BellRing size={20} />
            </span>
            <div>
              <strong>Notifikasyon</strong>
              <small>Disponib byento</small>
            </div>
            <small className="mobile-profile-option-status">BYENTO</small>
          </button>
          <Link href={localizedPath("ht", "profile/faq")}>
            <span aria-hidden="true">
              <CircleHelp size={20} />
            </span>
            <div>
              <strong>Kesyon souvan</strong>
              <small>Jwenn repons rapid sou sèvis yo</small>
            </div>
            <ChevronRight aria-hidden="true" size={20} />
          </Link>
          <Link href={localizedPath("ht", "profile/contact")}>
            <span aria-hidden="true">
              <Mail size={20} />
            </span>
            <div>
              <strong>Kontakte nou</strong>
              <small>Ekri ekip Vwayaj Ayisyen an</small>
            </div>
            <ChevronRight aria-hidden="true" size={20} />
          </Link>
        </nav>

        <ProfileWhatsapp url={whatsappUrl} />
      </section>
    );
  }

  async function uploadAvatar(file: File) {
    if (!viewer) return;
    setUploadError(false);
    setUploading(true);
    try {
      const image = await prepareAvatar(file);
      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: { "Content-Type": "image/webp" },
        body: image
      });
      if (!response.ok) throw new Error("avatar-upload-failed");
      setPreview(URL.createObjectURL(image));
    } catch {
      setUploadError(true);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mobile-profile-member">
      <section className="mobile-profile-card">
        <div className="mobile-avatar-control">
          <span>
            {preview ? (
              <Image
                alt="Foto pwofil ou"
                fill
                sizes="96px"
                src={preview}
                unoptimized={preview.startsWith("blob:") || preview.startsWith("http")}
              />
            ) : (
              <UserRound aria-hidden="true" size={42} />
            )}
          </span>
          <label>
            <Camera aria-hidden="true" size={17} />
            <span>{uploading ? "Ap prepare..." : "Chanje foto"}</span>
            <input
              accept="image/jpeg,image/png,image/webp"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadAvatar(file);
              }}
              type="file"
            />
          </label>
        </div>
        <h1>{viewer.displayName ?? "Pwofil mwen"}</h1>
        <p>{viewer.email}</p>
        <span className="profile-email-ok">
          <ShieldCheck aria-hidden="true" size={16} />
          Konekte ak Google
        </span>
      </section>

      <nav className="mobile-profile-options" aria-label="Opsyon kont mwen">
        <a href="#account-settings">
          <span aria-hidden="true">
            <Settings size={20} />
          </span>
          <div>
            <strong>Paramèt kont</strong>
            <small>Modifye enfòmasyon pèsonèl ou</small>
          </div>
          <ChevronRight aria-hidden="true" size={20} />
        </a>
        <Link href={localizedPath("ht", "profile/saved")}>
          <span aria-hidden="true">
            <Bookmark size={20} />
          </span>
          <div>
            <strong>Enfòmasyon anrejistre</strong>
            <small>Gade nouvèl ou te konsève yo</small>
          </div>
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
        <a href="#notifications">
          <span aria-hidden="true">
            <BellRing size={20} />
          </span>
          <div>
            <strong>Notifikasyon</strong>
            <small>Aktive oswa dezaktive rapèl yo</small>
          </div>
          <ChevronRight aria-hidden="true" size={20} />
        </a>
        <Link href={localizedPath("ht", "profile/faq")}>
          <span aria-hidden="true">
            <CircleHelp size={20} />
          </span>
          <div>
            <strong>Kesyon souvan</strong>
            <small>Jwenn 10 repons sou sèvis la</small>
          </div>
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
        <Link href={localizedPath("ht", "profile/contact")}>
          <span aria-hidden="true">
            <Mail size={20} />
          </span>
          <div>
            <strong>Kontakte nou</strong>
            <small>Voye yon mesaj bay ekip sipò a</small>
          </div>
          <ChevronRight aria-hidden="true" size={20} />
        </Link>
      </nav>

      <form action={formAction} className="mobile-profile-form" id="account-settings">
        <h2>Enfòmasyon kont mwen</h2>
        <label>
          <span>Non mwen</span>
          <input
            defaultValue={viewer.displayName ?? ""}
            maxLength={80}
            minLength={2}
            name="display_name"
            required
          />
        </label>
        <label>
          <span>Imèl Google</span>
          <input disabled readOnly type="email" value={viewer.email ?? ""} />
          <small>Imèl sa a soti nan Google epi li pa ka chanje isit la.</small>
        </label>
        <label>
          <span>Nimewo kontak</span>
          <input
            autoComplete="tel"
            defaultValue={viewer.phone ?? ""}
            inputMode="tel"
            maxLength={16}
            name="phone"
            pattern="\+[1-9][0-9]{7,14}"
            placeholder="+56912345678"
          />
        </label>
        <label>
          <span>Peyi kote mwen rete</span>
          <select defaultValue={viewer.residenceCountry ?? ""} name="residence_country" required>
            <option disabled value="">
              Chwazi peyi a
            </option>
            {RESIDENCE_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Dat nesans</span>
          <input
            defaultValue={viewer.birthDate ?? ""}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .slice(0, 10)}
            name="birth_date"
            required
            type="date"
          />
        </label>
        <label className="mobile-profile-notification-toggle" id="notifications">
          <span>
            <strong>Notifikasyon</strong>
            <small>Aktive oswa dezaktive rapèl kont ou.</small>
          </span>
          <input
            defaultChecked={viewer.notificationsEnabled ?? false}
            name="notifications_enabled"
            type="checkbox"
          />
        </label>
        {uploadError ? (
          <p className="mobile-auth-message" role="alert">
            Foto a dwe JPG, PNG oswa WebP epi li pa dwe depase 8 MB.
          </p>
        ) : null}
        {state.status === "saved" ? (
          <p className="profile-save-message" role="status">
            Chanjman yo anrejistre.
          </p>
        ) : null}
        {state.status === "invalid" || state.status === "unauthorized" ? (
          <p className="mobile-auth-message" role="alert">
            Nou pa t kapab anrejistre chanjman yo.
          </p>
        ) : null}
        <button className="button" disabled={pending || uploading} type="submit">
          <Save aria-hidden="true" size={18} />{" "}
          {pending ? "Ap anrejistre..." : "Anrejistre chanjman yo"}
        </button>
      </form>

      <ProfileWhatsapp url={whatsappUrl} />

      <form
        action={mobileSignOutAction}
        className="mobile-signout-form"
        onSubmit={async (event) => {
          event.preventDefault();
          await signOut(getFirebaseBrowserAuth()).catch(() => undefined);
          await fetch("/api/auth/firebase-session", { method: "DELETE" }).catch(() => undefined);
          window.localStorage.setItem(ACCOUNT_STATE_KEY, "guest");
          window.localStorage.removeItem("vwayaj-guest-started-at");
          window.location.assign("/ht/profile");
        }}
      >
        <button type="submit">Dekonekte</button>
      </form>
    </div>
  );
}

function ProfileWhatsapp({ url }: { url: string | null }) {
  return url ? (
    <a className="profile-whatsapp-card" href={url} rel="noreferrer" target="_blank">
      <MessageCircle aria-hidden="true" size={24} />
      <span>
        <strong>Mande èd sou WhatsApp</strong>
        <small>Louvri WhatsApp</small>
      </span>
    </a>
  ) : (
    <button
      aria-disabled="true"
      className="profile-whatsapp-card profile-whatsapp-disabled"
      disabled
      type="button"
    >
      <MessageCircle aria-hidden="true" size={24} />
      <span>
        <strong>Mande èd sou WhatsApp</strong>
        <small>Sèvis la ap disponib byento</small>
      </span>
    </button>
  );
}
