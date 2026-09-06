"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import {
  sendSupportMessageAction,
  type SupportMessageState
} from "@/app/[locale]/(public)/profile/contact/actions";

const initialState: SupportMessageState = { status: "idle" };

export function SupportContactForm() {
  const [state, formAction, pending] = useActionState(sendSupportMessageAction, initialState);
  const message =
    state.status === "sent"
      ? "Mesaj la ale jwenn ekip sipò a."
      : state.status === "limited"
        ? "Ou voye twòp mesaj nan yon ti tan. Eseye ankò pita."
        : state.status === "unavailable"
          ? "Sèvis mesaj la pa disponib kounye a."
          : state.status === "unauthorized"
            ? "Konekte ak Google anvan ou voye mesaj la."
            : state.status === "invalid"
              ? "Verifye tit ak detay mesaj la."
              : null;

  return (
    <form action={formAction} className="profile-contact-form">
      <label>
        <span>Tit mesaj la</span>
        <input maxLength={120} minLength={4} name="title" required />
      </label>
      <label>
        <span>Detay</span>
        <textarea maxLength={4000} minLength={20} name="detail" required rows={7} />
      </label>
      {message ? (
        <p
          className={state.status === "sent" ? "profile-contact-success" : "mobile-auth-message"}
          role="status"
        >
          {message}
        </p>
      ) : null}
      <button className="button" disabled={pending} type="submit">
        <Send aria-hidden="true" size={18} /> {pending ? "Ap voye..." : "Voye mesaj la"}
      </button>
    </form>
  );
}
