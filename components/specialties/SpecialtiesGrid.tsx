"use client";

import { useState } from "react";
import { SPECIALTIES } from "@/components/specialties/data";

// ─── Icon Paths (8 unique medical-themed SVG paths) ─────────────────────────
const ICON_PATHS = [
  "M12 4v16m-8-8h16",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M3 3v18h18M7 16l4-4 4 4 4-8",
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
];

// ─── Specialty icon images (public/icons/specialities/icons 1-16, icons 17-32, ...) ───────────
// Specialties listed here show their icon image ("<folder>/<file name>" without .webp);
// the rest keep the purple tile with a line icon.
const SPECIALTY_ICON_DIR = "/icons/specialities";
const SPECIALTY_ICONS: Record<string, string> = {
  "Acupuncture": "icons 1-16/1 Acupuncture",
  "Allergy & Immunology": "icons 1-16/2 Allergy & Immunology",
  "Anesthesia": "icons 1-16/3 Anesthesia",
  "Behavioral Health": "icons 1-16/4 Behavioral Health",
  "Cardiology": "icons 1-16/5 Cardiology",
  "Cardiovascular Surgery": "icons 1-16/6 Cardiovascular Surgery",
  "Chiropractic": "icons 1-16/7 Chiropractic",
  "Dentistry": "icons 1-16/8 Dentistry",
  "Dermatology": "icons 1-16/9 Dermatology",
  "DME Billing": "icons 1-16/10 DME Billing",
  "Emergency Medicine": "icons 1-16/11 Emergency Medicine",
  "Endocrinology": "icons 1-16/12 Endocrinology",
  "ENT / Otolaryngology": "icons 1-16/13 ENT  Otolaryngology",
  "Family Medicine": "icons 1-16/14 Family Medicine",
  "Gastroenterology": "icons 1-16/15 Gastroenterology",
  "General Practice": "icons 1-16/16 General Practice",
  "General Surgery": "icons 17-32/17 General Surgery",
  "Geriatrics": "icons 17-32/18 Geriatrics",
  "Hematology": "icons 17-32/19 Hematology",
  "Hepatology": "icons 17-32/20 Hepatology",
  "Hospitalists": "icons 17-32/21 Hospitalists",
  "Infectious Disease": "icons 17-32/22 Infectious Disease",
  "Internal Medicine": "icons 17-32/23 Internal Medicine",
  "Laboratory": "icons 17-32/24 Laboratory",
  "Mental Health": "icons 17-32/25 Mental Health",
  "NEMT": "icons 17-32/26 NEMT",
  "Neonatology": "icons 17-32/27 Neonatology",
  "Nephrology": "icons 17-32/28 Nephrology",
  "Neurology": "icons 17-32/29 Neurology",
  "OB/GYN": "icons 17-32/30 OB GYN",
  "Occupational Therapy": "icons 17-32/31 Occupational Therapy",
  "Oncology": "icons 17-32/32 Oncology",
  "Ophthalmology": "icons 33-36/33 Ophthalmology",
  "Optometry": "icons 33-36/34 Optometry",
  "Oral & Maxillofacial": "icons 33-36/35 Oral & Maxillofacial",
  "Orthopedics": "icons 33-36/36 Orthopedics",
  "Osteopathic Medicine": "icons 37-62/37 Osteopathic Medicine",
  "Pain Management": "icons 37-62/38 Pain Management",
  "Pathology": "icons 37-62/39 Pathology",
  "Pediatrics": "icons 37-62/40 Pediatrics",
  "Physical Medicine": "icons 37-62/41 Physical Medicine",
  "Physical Therapy": "icons 37-62/42 Physical Therapy",
  "Physiotherapy": "icons 37-62/43 Physiotherapy",
  "Plastic Surgery": "icons 37-62/44 Plastic Surgery",
  "Podiatry": "icons 37-62/45 Podiatry",
  "Primary Care": "icons 37-62/46 Primary Care",
  "Prostheses & Orthotics": "icons 37-62/47 Prostheses & Orthotics",
  "Psychiatry": "icons 37-62/48 Psychiatry",
  "Pulmonology": "icons 37-62/49 Pulmonology",
  "Radiology": "icons 37-62/50 Radiology",
  "Rheumatology": "icons 37-62/51 Rheumatology",
  "Sleep Medicine": "icons 37-62/52 Sleep Medicine",
  "Speech-Language Pathology": "icons 37-62/53 Speech-Language Pathology",
  "Telemedicine": "icons 37-62/54 Telemedicine",
  "Thoracic Surgery": "icons 37-62/55 Thoracic Surgery",
  "Toxicology": "icons 37-62/56 Toxicology",
  "Traumatology": "icons 37-62/57 Traumatology",
  "Urology": "icons 37-62/58 Urology",
  "Urgent Care": "icons 37-62/59 Urgent Care",
  "Vascular Surgery": "icons 37-62/60 Vascular Surgery",
  "Vein Center": "icons 37-62/61 Vein Center",
  "Wound Care": "icons 37-62/62 Wound Care",
};
const specialtyIcon = (name: string) =>
  SPECIALTY_ICONS[name] ? encodeURI(`${SPECIALTY_ICON_DIR}/${SPECIALTY_ICONS[name]}.webp`) : undefined;

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const FILTER_TABS = [
  { key: "all", label: "All Specialties" },
  { key: "surgical", label: "Surgical" },
  { key: "primary", label: "Primary Care" },
  { key: "therapy", label: "Therapy & Rehab" },
  { key: "diagnostic", label: "Diagnostic" },
  { key: "subspecialty", label: "Sub-Specialty" },
];

// SPECIALTIES GRID; each card opens the site-wide lead pop-up for its specialty
export default function SpecialtiesGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? SPECIALTIES : SPECIALTIES.filter((s) => s.category === activeFilter);

  return (
    <>
      <section className="pt-[60px] pb-[10px] px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1320px]">

          {/* Section header */}
          <div className="text-center mb-10">
            <span
              className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
            >
              100+ Therapy Disciplines Served
            </span>
            <h2
              className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold mb-4 leading-[1.15] tracking-tight"
              style={{ color: "#591e60" }}
            >
              Expert Billing Across <span className="text-[#d95959]">Every Therapy</span><br />
              and Medical Specialty
            </h2>
            <p className="font-body max-w-[1000px] mx-auto text-[18px] font-normal leading-[1.6]" style={{ color: "#3d2e42" }}>
              No two disciplines share the same payer contract language, CPT code set, or compliance hurdle.<br className="hidden sm:block" />
              Our therapy billing services assign coders who live and breathe your specialty—<br className="hidden sm:block" />
              delivering accuracy that outperforms any generalist billing operation from day one.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.key
                    ? "text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-800"
                }`}
                style={activeFilter === tab.key ? { background: "#591e60" } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-5">
            {filtered.map((spec, idx) => (
              // Opens the site-wide lead pop-up (components/LeadPopup.tsx) with this specialty's heading and description
              <div
                key={spec.name}
                data-lead-popup
                data-popup-heading={`${spec.name} Billing Form`}
                data-popup-description={`Connect with our ${spec.name} billing specialist today`}
                data-popup-source={`Specialties Page — ${spec.name} Card Click`}
                className="flex h-full flex-col bg-white rounded-2xl p-6 shadow-md border border-gray-100 card-hover group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                {/* Icon: the specialty's image where there is one, drawn 45% larger (about 70px) inside the same
                    48px space so every card keeps its size. Scaled from the centre, it spreads ~11px each way (13px on
                    hover) into the 24px card padding and the 16px gap above the title, never touching the text.
                    Otherwise the purple tile with a line icon */}
                {specialtyIcon(spec.name) ? (
                  <img
                    src={specialtyIcon(spec.name)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 shrink-0 mb-4 object-contain scale-[1.45] group-hover:scale-[1.55] transition-transform duration-300 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                  />
                ) : (
                  <div
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-white mb-4 scale-[1.45] group-hover:scale-[1.55] transition-transform duration-300 shadow-md"
                    style={{ background: "#591e60" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS[idx % ICON_PATHS.length]} />
                    </svg>
                  </div>
                )}

                <h3 className="text-[22px] font-bold mb-0.5" style={{ color: "#45134b" }}>
                  {spec.name}
                </h3>
                <p className="text-xs font-semibold mb-2" style={{ color: "#d95959" }}>
                  {spec.name} Billing
                </p>
                <p className="text-gray-700 text-xs leading-relaxed mb-4">
                  {spec.desc}
                </p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {spec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#f6eff6", color: "#591e60" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No therapy specialties matched your selection. Try a different filter above.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

