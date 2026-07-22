"use client";

import { Pause, Volume2 } from "lucide-react";
import { useState } from "react";

type ReadAloudButtonProps = {
  label: string;
  locale: string;
};

export function ReadAloudButton({ label, locale }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  function toggleSpeech() {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const main = document.querySelector("main");
    const text = main?.textContent?.trim();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12_000));
    utterance.lang = locale;
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button className="listen-button" type="button" onClick={toggleSpeech} aria-pressed={speaking}>
      {speaking ? <Pause aria-hidden="true" size={20} /> : <Volume2 aria-hidden="true" size={20} />}
      <span>{speaking ? "Sispann" : label}</span>
    </button>
  );
}
