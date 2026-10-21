// SECTION 7: MENTAL HEALTH CPT CODES & BILLING RULES
export default function CptCodes() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16 md:mb-20">
          <div className="mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              CPT Codes and Billing Rules
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 text-[#591e60]">
            Mental Health <span className="text-[#d95959]">CPT Codes</span>: What Your
            <br />
            <span className="text-[#591e60]">Billing Team Must Know for Clean Claims</span>
          </h2>

          <p className="leading-[1.6] font-normal max-w-[760px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Clean mental health claims need the right code, the right time threshold, and documentation that proves both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1180px] mx-auto items-center">
          {/* CARD 1: Psychotherapy Codes */}
          <div className="@container relative w-full aspect-[639.89/485.11]">
            <svg
              viewBox="0 0 639.89 485.11"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M95.2,161.12S152.56-116.35,356.81,58.1c0,0,166.48,168.96,247.62,217.03,0,0,70.43,61.13-14.52,142.31-32.23,30.8-73.05,50.95-116.79,59.51-78.5,15.37-220.51,19.73-328.95-108.42,0,0-61.56-98.9-48.96-207.42Z"
                fill="none"
                stroke="#591e60"
                strokeMiterlimit="10"
              />
              <path
                d="M92.99,135.69s53.3-165.24,216.45-57.54c16.72,11.04,34.61,20.18,53.21,27.64,35.7,14.34,92.23,35.21,136.41,43.03,24.78,4.39,48.81,12.52,70.53,25.23,31.64,18.5,66.89,49.17,70.09,94.94,1.52,21.7-4.86,43.21-17.01,61.25-26.46,39.27-101.13,134.16-209.21,141.74-8.56.6-17.11,1.4-25.64,2.32-33.25,3.62-132.08,3.98-240.37-94.99,0,0-98.88-123.25-54.46-243.63Z"
                fill="#e6dae6"
              />
              <path
                d="M415.04,33.58s4.38-13.57,17.78-4.73c1.37.91,2.84,1.66,4.37,2.27,2.93,1.18,7.58,2.89,11.21,3.54,2.04.36,4.01,1.03,5.79,2.07,2.6,1.52,5.49,4.04,5.76,7.8.12,1.78-.4,3.55-1.4,5.03-2.17,3.23-8.31,11.02-17.19,11.64-.7.05-1.41.11-2.11.19-2.73.3-10.85.33-19.75-7.8,0,0-8.12-10.12-4.47-20.01Z"
                fill="#d85959"
              />
              <path
                d="M146.01,391.46s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                fill="#d85959"
              />
              <path
                d="M512.64,97.6s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                fill="#d85959"
              />
              <circle cx="102.23" cy="131.59" r="102.23" fill="#fbf4f7" stroke="#d85959" strokeWidth="2" />
            </svg>

            <div className="absolute top-[8%] left-[2%] w-[28%] h-[38%] flex items-center justify-center text-center p-2 font-heading text-[#591e60] font-extrabold text-[length:clamp(9.5px,3cqw,17px)] leading-tight z-20 pointer-events-none select-none">
              Psychotherapy
              <br />
              Codes:
            </div>

            <div className="absolute top-[60%] -translate-y-1/2 left-[33%] w-[54%] z-10 text-left flex flex-col items-center justify-center">
              <h3 className="font-heading text-[#d85959] font-extrabold text-[length:clamp(14px,3.8cqw,22px)] leading-[1.25] mb-[1.2cqw] tracking-tight">
                90832, 90834, and 90837
              </h3>
              <p className="text-gray-700 text-[length:clamp(11px,2.7cqw,16px)] leading-[1.5] font-normal">
                Time thresholds are exact: 90832 needs 16 minutes, 90834 needs 38, 90837 needs 53. A 52-minute session bills as 90834. The note must state total face-to-face minutes, and missing that number is the most common 90837 denial we see.
              </p>
            </div>
          </div>

          {/* CARD 2: Evaluation Codes */}
          <div className="@container relative w-full aspect-[624.03/448.45]">
            <svg
              viewBox="0 0 624.03 448.45"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M77.39,215.16c-11.52-37.05-1.11-77.36,26.73-103.37,28.43-26.56,70.35-33.84,106.76-18.91,6.73,2.76,13.65,5.04,20.76,6.58,30.94,6.67,45.42.69,52.94-6.41,13-12.26,10.5-22.71,24.7-42.53,12.02-16.78,27.86-26,39.13-31.12,8.06-2.23,42.42-10.74,79.17,7.7,38.55,19.35,51.94,54.41,54.59,61.84,0,0,14.48,53.09,80.77,69.88,20.46,5.18,38.49,17.61,49.55,35.58,10.96,17.81,17.18,43.42,4.54,78.12-8.14,22.34-22.07,42.09-39.87,57.85-72.1,63.8-334.17,258.24-499.75-115.2Z"
                fill="#e6dae6"
              />
              <path
                d="M69.22,249.76c-16.07-35.32-10.5-76.58,14.31-105.79,25.17-29.64,66.04-42.04,104.21-32.08,7.58,1.98,15.27,3.57,23.08,4.23,31.41,2.64,45.08-5.02,51.73-12.92,11.57-13.76,7.79-23.81,19.65-45.22,10.04-18.12,24.84-29.21,35.53-35.67,7.83-3.2,41.31-15.87,80.47-2.1,41.07,14.45,58.78,47.57,62.35,54.62,0,0,21.03,50.97,89.84,59.4,21.91,2.68,42.14,13.64,55.36,31.07,12.67,16.71,21.12,41.6,11.92,77.56-5.72,22.34-17.19,42.77-32.6,59.93-64.98,72.37-304.4,296.6-515.85-53.03Z"
                fill="none"
                stroke="#591e60"
                strokeMiterlimit="10"
              />
              <path
                d="M273.01,12.96s7.35-22.78,29.84-7.93c2.3,1.52,4.77,2.78,7.33,3.81,4.92,1.98,12.71,4.85,18.8,5.93,3.42.6,6.73,1.73,9.72,3.48,4.36,2.55,9.22,6.78,9.66,13.09.21,2.99-.67,5.96-2.34,8.44-3.65,5.41-13.94,18.49-28.84,19.54-1.18.08-2.36.19-3.53.32-4.58.5-18.21.55-33.13-13.09,0,0-13.63-16.99-7.51-33.58Z"
                fill="#d85959"
              />
              <path
                d="M508.51,382.69s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                fill="#d85959"
              />
              <path
                d="M401.91,421.26s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                fill="#d85959"
              />
              <circle cx="102.23" cy="272.73" r="102.23" fill="#fbf4f7" stroke="#d85959" strokeWidth="2" />
            </svg>

            <div className="absolute top-[40%] left-[2%] w-[28%] h-[40%] flex items-center justify-center text-center p-2 font-heading text-[#591e60] font-extrabold text-[length:clamp(9.5px,3cqw,17px)] leading-tight z-20 pointer-events-none select-none">
              Evaluation
              <br />
              Codes:
            </div>

            <div className="absolute top-[55%] -translate-y-1/2 left-[36%] w-[51%] z-10 text-left flex flex-col items-center justify-center">
              <h3 className="font-heading text-[#d85959] font-extrabold text-[length:clamp(14px,3.8cqw,22px)] leading-[1.25] mb-[1.2cqw] tracking-tight">
                90791 vs 90792
              </h3>
              <p className="text-gray-700 text-[length:clamp(11px,2.7cqw,16px)] leading-[1.5] font-normal">
                90791 is for non-prescribing providers (LCSW, LPC, LMFT, LMHC), and psychologists. 90792 is for prescribers managing medication in the same encounter. A non-prescribing therapist billing 90792 creates audit exposure. Most payers reimburse 90791 once per episode of care.
              </p>
            </div>
          </div>

          {/* CARD 3: Family, Group, and Crisis Codes */}
          <div className="@container relative w-full aspect-[550.09/412.22]">
            <svg
              viewBox="0 0 550.09 412.22"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M458.33,19.75s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                fill="#d85959"
              />
              <path
                d="M130.99,71.88c-.52-25.93,7.99-56.5,46.93-68.14,21.39-6.4,44.42-4.43,64.72,4.89,36.31,16.69,116.26,49.22,185.8,48.27,22.02-.3,43.93,3.98,63.78,13.5,33.7,16.15,69.54,50.23,54.24,121.41,0,0-32.71,130.85-198.61,182.25,0,0-175.24,64.26-235.99-65.42,0,0-28.91-85.88,3.94-158.98,10.96-24.39,15.72-51.03,15.19-77.77Z"
                fill="#e6dae6"
              />
              <path
                d="M107.49,131.1c-7.28-23.68-7.11-53.52,25.06-75.25,19.05-12.87,42.4-17.91,65.16-15.01,42.57,5.42,137.55,13.15,205.27-13.7,0,0,128.79-28.26,138.63,97.01,0,0,5.89,132.47-138.9,229.2,0,0-150.11,111.53-245.51,7.44,0,0-49.96-69.01-42.2-145.21,2.9-28.45.87-57.24-7.5-84.49Z"
                fill="none"
                stroke="#591e60"
                strokeMiterlimit="10"
              />
              <circle cx="102.23" cy="252.62" r="102.23" fill="#fbf4f7" stroke="#d85959" strokeWidth="2" />
              <path
                d="M408.09,346.46s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                fill="#d85959"
              />
              <path
                d="M103.41,46.62s5.46-16.94,22.19-5.9c1.71,1.13,3.55,2.07,5.45,2.83,3.66,1.47,9.45,3.61,13.98,4.41,2.54.45,5,1.28,7.23,2.59,3.24,1.9,6.86,5.04,7.19,9.73.16,2.22-.5,4.43-1.74,6.28-2.71,4.03-10.37,13.75-21.45,14.53-.88.06-1.75.14-2.63.24-3.41.37-13.54.41-24.64-9.74,0,0-10.14-12.63-5.58-24.97Z"
                fill="#d85959"
              />
            </svg>

            <div className="absolute top-[40%] left-[2%] w-[33%] h-[42%] flex items-center justify-center text-center p-2 font-heading text-[#591e60] font-extrabold text-[length:clamp(9.5px,3cqw,17px)] leading-tight z-20 pointer-events-none select-none">
              Family, Group,
              <br />
              and Crisis
              <br />
              Codes
            </div>

            <div className="absolute top-[38%] -translate-y-1/2 left-[38%] w-[52%] z-10 text-center flex flex-col items-center justify-center">
              <p className="text-gray-700 text-[length:clamp(11px,2.7cqw,16px)] leading-[1.5] font-normal">
                90847 covers family or couples therapy with the patient present, 90846 without. 90853 covers group at one unit regardless of length. 90839 covers the first 60 minutes of crisis work with 30 minutes minimum active intervention. 90785 needs a documented complexity factor.
              </p>
            </div>
          </div>

          {/* CARD 4: Telehealth Place of Service */}
          <div className="@container relative w-full aspect-[576.85/418.51]">
            <svg
              viewBox="0 0 576.85 418.51"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M172.29,13.13s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                fill="#d85959"
              />
              <path
                d="M386.47,391.87s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                fill="#d85959"
              />
              <path
                d="M80.88,82c21.3-25.91,50.06-44.86,82.6-52.98,11.25-2.81,23.72-4.57,37.26-4.52,30.78.1,54.55,9.51,67.64,15.91,0,0,63.44,36.16,132.36,41.77,18.03,1.47,35.58,6.42,51.57,14.47,46.95,23.64,125.62,78.3,91.54,168.07,0,0-31.3,112.15-207.5,84.11,0,0-46.51-11.9-92.12,42.48,0,0-84.97,72.22-185.14-18.69-21.82-29.91-31.1-57.03-35.44-73.92C.96,210.5,44.8,136.48,56.4,116.88c8.1-13.67,16.6-25.3,24.48-34.88Z"
                fill="#e6dae6"
              />
              <path
                d="M186.57,10.57c12.04-2.81,54.54-11.15,97.85,12.15,24.61,13.24,39.43,31.29,47.04,42.25,0,0,34.62,57.45,87.3,91.61,13.78,8.94,25.62,20.59,34.82,34.18,27.01,39.9,65.54,119.38-1.93,180.15,0,0-75.28,80.73-203.84-18.08,0,0-31.92-29.86-92.8-3.72,0,0-68.32,16.53-114.43-44.55-19.65-26.04-28.67-58.25-26.61-90.27,1-15.47,3.52-28.03,5.84-37.15C41.15,93.43,109.39,50.05,127.46,38.57c23.58-14.99,45.1-23.37,59.11-28Z"
                fill="none"
                stroke="#591e60"
                strokeMiterlimit="10"
              />
              <circle cx="474.62" cy="159.97" r="102.23" fill="#fbf4f7" stroke="#d85959" strokeWidth="2" />
              <path
                d="M2.1,310.3s9.76-30.26,39.64-10.54c3.06,2.02,6.34,3.69,9.74,5.06,6.54,2.63,16.89,6.45,24.98,7.88,4.54.8,8.94,2.29,12.92,4.62,5.79,3.39,12.25,9,12.84,17.39.28,3.97-.89,7.91-3.11,11.22-4.85,7.19-18.52,24.57-38.31,25.96-1.57.11-3.13.26-4.7.43-6.09.66-24.19.73-44.02-17.4,0,0-18.11-22.57-9.97-44.61Z"
                fill="#d85959"
              />
              <path
                d="M185.1,373.02s4.05-12.56,16.46-4.37c1.27.84,2.63,1.53,4.05,2.1,2.71,1.09,7.01,2.68,10.37,3.27,1.88.33,3.71.95,5.36,1.92,2.41,1.41,5.09,3.74,5.33,7.22.12,1.65-.37,3.28-1.29,4.66-2.01,2.99-7.69,10.2-15.9,10.78-.65.05-1.3.11-1.95.18-2.53.27-10.04.3-18.27-7.22,0,0-7.52-9.37-4.14-18.52Z"
                fill="#d85959"
              />
            </svg>

            <div className="absolute top-[17%] right-[2%] w-[33%] h-[40%] flex items-center justify-center text-center p-2 font-heading text-[#591e60] font-extrabold text-[length:clamp(9.5px,3cqw,17px)] leading-tight z-20 pointer-events-none select-none">
              Telehealth
              <br />
              Place of
              <br />
              Service:
            </div>

            <div className="absolute top-[52%] -translate-y-1/2 left-[11%] w-[52%] z-10 text-center flex flex-col items-center justify-center">
              <h3 className="font-heading text-[#d85959] font-extrabold text-[length:clamp(14px,3.8cqw,22px)] leading-[1.25] mb-[1.2cqw] tracking-tight">
                POS 02 vs POS 10
              </h3>
              <p className="text-gray-700 text-[length:clamp(11px,2.7cqw,16px)] leading-[1.5] font-normal">
                POS 10 applies when the patient is at home, POS 02 anywhere else. POS 10 pays at the non-facility rate, which reimburses higher for the same session. Modifier 95 is required on audio-video sessions. Defaulting everything to POS 02 costs you every home visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
