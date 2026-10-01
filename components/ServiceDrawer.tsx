"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { BUSINESS_PHONE } from "@/config/contact";

type ServiceDrawerProps = {
  service: { title: string; description: string; buttonText: string };
  onClose: () => void;
  eyebrow?: string;
};

export function ServiceDrawer({ service, onClose, eyebrow = "Full Scope" }: ServiceDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) {
          onClose();
        }
      }}
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-lg overflow-y-auto border-0 bg-white p-6 text-[#591e60] shadow-2xl backdrop:bg-black/50 sm:p-10"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold uppercase tracking-wide">{eyebrow}</span>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Close service details"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#591e60]/20 text-2xl cursor-pointer"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <h2 id={titleId} className="font-heading mb-5 text-3xl font-bold">
        {service.title}
      </h2>
      <p id={descriptionId} className="font-body text-base leading-relaxed text-gray-700">
        {service.description}
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link href="/contact-us" className="rounded-lg bg-[#591e60] px-5 py-3 text-center font-semibold text-white hover:bg-[#45134b]">
          {service.buttonText} <span aria-hidden="true">→</span>
        </Link>
        <a href={BUSINESS_PHONE.href} className="hero-call-button rounded-lg border-2 border-[#591e60] px-5 py-3 text-center font-semibold">
          Call {BUSINESS_PHONE.display}
        </a>
      </div>
    </dialog>
  );
}
