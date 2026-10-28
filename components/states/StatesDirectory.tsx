"use client";

import { useState } from "react";
import Link from "next/link";

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export default function StatesDirectory() {
  const [selectedState, setSelectedState] = useState<(typeof states)[number] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {states.map((state, index) => {
          const isSelected = selectedState?.code === state.code;
          const accent = index % 2 === 0 ? "#591e60" : "#d95959";

          return (
            <button
              key={state.code}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedState(state)}
              className={`group flex min-h-[138px] flex-col items-center justify-center gap-3 rounded-xl border bg-white px-3 py-5 text-center shadow-[0_6px_18px_rgba(89,30,96,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(89,30,96,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d95959] focus-visible:ring-offset-2 ${
                isSelected ? "border-[#591e60] ring-2 ring-[#591e60]/20" : "border-[#eadfeb]"
              }`}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-lg font-extrabold text-white shadow-md transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              >
                {/* Flag of the state fills the circle; the name is printed beside it */}
                <img
                  src={`/flags/states/${state.code.toLowerCase()}.webp`}
                  alt={`${state.name} state flag`}
                  width={112}
                  height={112}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <span className="font-heading text-[15px] font-semibold leading-tight text-[#591e60]">
                {state.name}
              </span>
            </button>
          );
        })}
      </div>

      {selectedState && (
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#591e60] p-6 text-white shadow-[0_12px_30px_rgba(89,30,96,0.2)] sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#f2b5b2]">
              Selected state
            </p>
            <h3 className="font-heading text-2xl font-extrabold">{selectedState.name}</h3>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/90">
              Ask our team about therapy billing support and payer requirements for your practice in {selectedState.name}.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="btn-hover inline-flex shrink-0 items-center justify-center rounded-lg bg-[#d95959] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c94c4c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#591e60]"
          >
            Request billing support
          </Link>
        </div>
      )}
    </>
  );
}
