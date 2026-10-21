// SECTION 3: THREE STEPS, NO SALES SEQUENCE
export default function ThreeSteps() {
  return (
    <section className="py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Purple Badge */}
        <div className="inline-block mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            After You Submit
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight text-[#591e60] leading-[1.15] mb-14">
          <span className="text-[#d95959]">Three Steps</span>,{" "}
          No Sales Sequence
        </h2>

        {/* 3 Step Cards Grid. From md up the cards share the row's height, so the left and right cards
            (both drawn at 95%) are exactly the same size, and the centre card stands out at 110% */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center md:items-stretch max-w-5xl mx-auto">
          {/* CARD 1 */}
          <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex flex-col md:scale-[0.95] transition-transform duration-300 hover:-translate-y-1">
            <div className="pt-7 pb-4 px-6 flex flex-col items-center bg-white">
              <h3 className="text-[22px] font-bold text-[#4d2050] mb-5">
                1. Within One Business Day
              </h3>
              <img
                src="/icons/contact-us-page/after%20you%20sumit/Within%20One%20Business%20Day.webp"
                alt=""
                width={88}
                height={88}
                loading="lazy"
                decoding="async"
                className="w-[88px] h-[88px] object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
              />
            </div>

            {/* Purple Layer Bottom */}
            <div className="relative flex-1 flex items-center justify-center px-6 pt-11 pb-9 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 357.33 275.83"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M333.33,275.83H24C10.75,275.83,0,267.46,0,257.15V43.05C0,32.73,10.75,24.37,24,24.37c21.84,2.04,54.37,3.36,92.47-2.08,38.09-5.43,54-13.63,83.65-18.68,28.7-4.89,70.58-6.91,125.33,7.76,5.6,2.19,16.6,7.4,24.85,18.47,3.57,4.79,5.71,9.45,7.03,13.21v214.1c0,10.32-10.75,18.68-24,18.68Z"
                  fill="#591e60"
                  opacity=".51"
                />
                <path
                  d="M24,275.83h309.33c13.25,0,24-8.36,24-18.68V43.05c0-10.32-10.75-18.68-24-18.68-21.84,2.04-54.37,3.36-92.47-2.08-38.09-5.43-54-13.63-83.65-18.68C128.52-1.27,86.63-3.29,31.88,11.38c-5.6,2.19-16.6,7.4-24.85,18.47C3.46,34.63,1.32,39.29,0,43.05v214.1c0,10.32,10.75,18.68,24,18.68Z"
                  fill="#591e60"
                  opacity=".21"
                />
              </svg>
              <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                A specialist replies by email or phone, whichever you picked. Not a scheduling link. An actual person with a question about your payer mix.
              </p>
            </div>
          </div>

          {/* CARD 2 (Center) */}
          <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_8px_20px_rgba(0,0,0,0.20)] flex flex-col md:scale-110 transition-transform duration-300 hover:-translate-y-1">
            <div className="pt-8 pb-5 px-6 flex flex-col items-center bg-white">
              <h3 className="text-[22px] font-bold text-[#4d2050] mb-5">
                2. The Audit Call
              </h3>
              <img
                src="/icons/contact-us-page/after%20you%20sumit/The%20Audit%20Call.webp"
                alt=""
                width={104}
                height={104}
                loading="lazy"
                decoding="async"
                className="w-[104px] h-[104px] object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
              />
            </div>

            {/* Pink Layer Bottom */}
            <div className="relative flex-1 flex items-center justify-center px-6 pt-13 pb-11 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 422.09 333.6"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M393.74,333.6H28.35c-15.66,0-28.35-9.88-28.35-22.06V58.63c1.85-4.8,4.48-10.15,8.3-15.6C21.97,23.53,42.13,14.98,52.04,11.57,88.65-1.05,128.01-.54,141.38.46c15.4,1.15,27.57,3.07,37.96,5.35,47.38,10.42,48.09,15.66,75.37,19.32,28.67,3.85,73.05,2.17,105.33-6.17,5.49-1.42,20-5.45,34.67,0,2.78,1.03,12.35,4.72,18.67,13.57,0,0,3.23,4.53,8.71,26.09h0v252.9c0,12.18-12.69,22.06-28.35,22.06Z"
                  fill="#d95959"
                  opacity=".3"
                />
                <path
                  d="M28.35,333.6h365.39c15.66,0,28.35-9.54,28.35-21.3V68.15c-1.56-4.29-4.08-9.6-8.3-15.06-9.75-12.62-22.74-18.56-29.36-21.06-14.47-4.12-36.86-9.16-64.38-9.58-42.86-.66-49.9,10.59-89,12.56-54.24,2.74-66.92-17.58-123.08-15.95-30.78.89-55.38,7.82-70.31,12.97-6.61,2.5-19.61,8.44-29.36,21.06C4.08,58.55,1.56,63.86,0,68.15v244.14C0,324.06,12.69,333.6,28.35,333.6Z"
                  fill="#d95959"
                  opacity=".3"
                />
              </svg>
              <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                Twenty to thirty minutes. We go through your denials, your aging, and either your unit counts or your authorization load depending on what you bill. You leave with numbers whether or not you sign.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex flex-col md:scale-[0.95] transition-transform duration-300 hover:-translate-y-1">
            <div className="pt-7 pb-4 px-6 flex flex-col items-center bg-white">
              <h3 className="text-[22px] font-bold text-[#4d2050] mb-5">
                3. A Written Quote
              </h3>
              <img
                src="/icons/contact-us-page/after%20you%20sumit/A%20Written%20Quote.webp"
                alt=""
                width={88}
                height={88}
                loading="lazy"
                decoding="async"
                className="w-[88px] h-[88px] object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
              />
            </div>

            {/* Purple Layer Bottom */}
            <div className="relative flex-1 flex items-center justify-center px-6 pt-11 pb-9 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 357.33 275.83"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M333.33,275.83H24C10.75,275.83,0,267.46,0,257.15V43.05C0,32.73,10.75,24.37,24,24.37c21.84,2.04,54.37,3.36,92.47-2.08,38.09-5.43,54-13.63,83.65-18.68,28.7-4.89,70.58-6.91,125.33,7.76,5.6,2.19,16.6,7.4,24.85,18.47,3.57,4.79,5.71,9.45,7.03,13.21v214.1c0,10.32-10.75,18.68-24,18.68Z"
                  fill="#591e60"
                  opacity=".51"
                />
                <path
                  d="M24,275.83h309.33c13.25,0,24-8.36,24-18.68V43.05c0-10.32-10.75-18.68-24-18.68-21.84,2.04-54.37,3.36-92.47-2.08-38.09-5.43-54-13.63-83.65-18.68C128.52-1.27,86.63-3.29,31.88,11.38c-5.6,2.19-16.6,7.4-24.85,18.47C3.46,34.63,1.32,39.29,0,43.05v214.1c0,10.32,10.75,18.68,24,18.68Z"
                  fill="#591e60"
                  opacity=".21"
                />
              </svg>
              <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                Your rate in writing, based on your collections and claim volume. No setup fee, and nothing starts until you say so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
