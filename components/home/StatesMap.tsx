"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, FluidSection } from "@/components/FluidLayout";

// 18 State items (4 + 3 + 4 + 3 + 4 pattern)
const statesData = [
  { code: "AL", name: "Alabama", flag: "/flags/states/al.webp" },
  { code: "AK", name: "Alaska", flag: "/flags/states/ak.webp" },
  { code: "AZ", name: "Arizona", flag: "/flags/states/az.webp" },
  { code: "AR", name: "Arkansas", flag: "/flags/states/ar.webp" },
  { code: "CA", name: "California", flag: "/flags/states/ca.webp" },
  { code: "CO", name: "Colorado", flag: "/flags/states/co.webp" },
  { code: "CT", name: "Connecticut", flag: "/flags/states/ct.webp" },
  { code: "DE", name: "Delaware", flag: "/flags/states/de.webp" },
  { code: "FL", name: "Florida", flag: "/flags/states/fl.webp" },
  { code: "GA", name: "Georgia", flag: "/flags/states/ga.webp" },
  { code: "HI", name: "Hawaii", flag: "/flags/states/hi.webp" },
  { code: "ID", name: "Idaho", flag: "/flags/states/id.webp" },
  { code: "IL", name: "Illinois", flag: "/flags/states/il.webp" },
  { code: "IN", name: "Indiana", flag: "/flags/states/in.webp" },
  { code: "MI", name: "Michigan", flag: "/flags/states/mi.webp" },
  { code: "MN", name: "Minnesota", flag: "/flags/states/mn.webp" },
  { code: "MS", name: "Mississippi", flag: "/flags/states/ms.webp" },
  { code: "MT", name: "Montana", flag: "/flags/states/mt.webp" },
];

// SECTION 5: US MAP & STATES HEXAGONS
export default function StatesMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Hexagon columns generated dynamically
  const columns: (typeof statesData)[] = [];
  let tempIndex = 0;
  let colIndex = 0;
  while (tempIndex < statesData.length) {
    const colSize = colIndex % 2 === 0 ? 4 : 3;
    columns.push(statesData.slice(tempIndex, tempIndex + colSize));
    tempIndex += colSize;
    colIndex++;
  }

  return (
    <FluidSection
      id="states"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f3e8f7" }}
    >
      <img
        src="/map4x.png"
        alt="US Map Background"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-10"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = "none";
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-10">

          {/* LEFT SIDE - Text Content */}
          <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Eyebrow: 14px Desktop / 12px Mobile */}
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-4 sm:mb-5 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              All 50 States
            </span>

            {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
            <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-4">
              Therapy Billing Services in{" "}
              <span className="lg:whitespace-nowrap">
                <span className="text-[#d95959]">Every State</span> You're{" "}
                <span className="text-[#591e60]">Licensed In</span>
              </span>
            </h2>

            {/* Body Regular: 16px */}
            <p className="font-body text-[18px] leading-relaxed mb-6" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
              Commercial claims run about the same everywhere. Four things change at the state line: Medicaid and its managed care layer, workers comp fee schedules set by state law, no-fault auto rules that only exist in PIP states, and telehealth place-of-service requirements that follow the patient rather than the provider.
              We track all four per state, per payer.
            </p>

            {/* Button Text: 16px. Shown here only while the two columns sit side by side */}
            <Link
              href="/states"
              className="btn-hover hidden min-[827px]:inline-block font-body bg-[#591e60] text-white text-[16px] font-semibold leading-none px-7 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              See All 50 States
            </Link>
          </div>

          {/* RIGHT SIDE - 4-3-4-3-4 Hexagon Columns */}
          <div className="w-full flex justify-center items-center overflow-x-auto py-4 px-2">
            {/* --hex is the hexagon width; spacing and text sizes below are derived from it.
                Columns and rows are stepped as a true honeycomb so the gap is 8px on every side. */}
            <div className="flex flex-row items-start justify-center min-w-max [--hex:clamp(56px,calc(22.3vw_-_11px),144px)] min-[826px]:[--hex:clamp(70px,9.2vw,144px)] lg:[--hex:clamp(90px,9.6vw,144px)]">
              {columns.map((colStates, colIdx) => {
                const isOddCol = colIdx % 2 === 1;

                return (
                  <div
                    key={colIdx}
                    className={`flex flex-col items-center ${
                      isOddCol ? "mt-[calc(var(--hex)_*_0.45_+_4px)]" : "mt-0"
                    } ${colIdx > 0 ? "ml-[calc(6.93px_-_var(--hex)_*_0.2206)]" : ""}`}
                  >
                    {colStates.map((state, stateIdx) => {
                      const isHovered = hoveredState === state.code;

                      return (
                        <div
                          key={state.code}
                          className={`flex flex-col items-center cursor-pointer transition-all duration-200 select-none ${
                            stateIdx > 0 ? "mt-2" : ""
                          }`}
                          onMouseEnter={() => setHoveredState(state.code)}
                          onMouseLeave={() => setHoveredState(null)}
                        >
                          <div
                            className={`relative flex flex-col items-center justify-center gap-[calc(var(--hex)_*_0.03)] transition-all duration-200 w-[var(--hex)] aspect-[10/9] ${
                              isHovered ? "scale-110 z-20" : "scale-100 z-10"
                            }`}
                          >
                            <svg
                              viewBox="0 0 200 180"
                              className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_4px_8px_rgba(89,30,96,0.22)]"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* Regular flat-top hexagon. Round-joined strokes round every corner: 22.2 units = 16px at the full 144px size */}
                              <polygon
                                points="177.8,90 138.9,157.4 61.1,157.4 22.2,90 61.1,22.6 138.9,22.6"
                                fill={isHovered ? "#d95959" : "#e0d1e4"}
                                stroke={isHovered ? "#d95959" : "#e0d1e4"}
                                strokeWidth="44.4"
                                strokeLinejoin="round"
                                className="transition-colors duration-200"
                              />
                              <polygon
                                points="177.8,90 138.9,157.4 61.1,157.4 22.2,90 61.1,22.6 138.9,22.6"
                                fill="#ffffff"
                                stroke="#ffffff"
                                strokeWidth={isHovered ? "37.5" : "40.2"}
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div className="relative z-10 overflow-hidden rounded-full w-[36%] aspect-square shadow-sm border border-[#d95959]/50">
                              <img
                                src={state.flag}
                                alt={`${state.name} flag`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "https://via.placeholder.com/80x80/591e60/ffffff?text=" +
                                    state.code;
                                }}
                              />
                            </div>

                            <span
                              className="relative z-10 font-body text-[max(8px,calc(var(--hex)_*_0.105))] leading-[1.15] font-bold text-center truncate max-w-[76%] transition-colors duration-200"
                              style={{
                                color: isHovered ? "#d95959" : "#591e60",
                              }}
                            >
                              {state.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Once the columns stack (mobile and tablet), the button moves below the hexagon grid */}
          <div className="flex justify-center min-[827px]:hidden">
            <Link
              href="/states"
              className="btn-hover font-body bg-[#591e60] text-white text-[16px] font-semibold leading-none px-7 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              See All 50 States
            </Link>
          </div>

        </div>
      </Container>
    </FluidSection>
  );
}
