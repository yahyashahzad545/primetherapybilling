// SECTION 6: THE PT BILLING DIFFERENCE (8-MINUTE RULE & MEDICARE MODIFIERS)
export default function BillingDifference() {
  // --- [DATA: SECTION 6 - 8-MINUTE RULE DATA] ---
  const eightMinuteRuleData = [
    { minutes: "0 to 7", units: "0" },
    { minutes: "8 to 22", units: "1" },
    { minutes: "23 to 37", units: "2" },
    { minutes: "38 to 52", units: "3" },
    { minutes: "53 to 67", units: "4" },
  ];

  return (
    <section className="font-body w-full bg-[#521c56] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-white relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            The PT Billing Difference
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] text-center tracking-tight text-white max-w-[1000px]">
          Physical Therapy Billing Units, the{" "}
          <span className="text-[#d95959]">8-Minute Rule,</span>{" "}
          and Two Medicare Modifiers
        </h2>

        <p className="leading-[1.6] text-center max-w-[850px] mt-4 font-normal text-[18px] text-white">
          PT runs on a rule set no other therapy specialty shares. Two of those rules decide what gets paid on nearly every claim.
        </p>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 lg:gap-x-14 lg:gap-y-4 xl:gap-x-20 xl:gap-y-5 items-center mt-12 sm:mt-16 lg:mt-20">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-white tracking-tight mb-5">
              The 8-Minute Rule Sets the Unit Count on Every Timed Code
            </h3>
            <p className="text-[16px] leading-[1.6] text-white/90 font-normal mb-4">
              Medicare's 8-minute rule determines how many units of a timed code you can bill. Eight minutes is the minimum for one unit, and the count comes from total timed minutes across all timed codes in the session, not from each code separately.
            </p>
            <p className="text-[16px] leading-[1.6] text-white/90 font-normal">
              A 45-minute session of 97110 and 97140 bills 3 units total, however the time splits between them. A billing team applying a default unit count instead of calculating from documented minutes overbills some sessions and underbills others.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="bg-white text-[#1f1924] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.3)] w-full max-w-[480px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="font-heading text-[16px] w-1/2 text-center pb-3 font-bold text-[#d86358] border-r border-[#4d1e52]/40 tracking-tight">
                      Total timed minutes
                    </th>
                    <th className="font-heading text-[16px] w-1/2 text-center pb-3 font-bold text-[#d86358] tracking-tight pl-2">
                      Billable units
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eightMinuteRuleData.map((row, idx) => (
                    <tr key={idx} className="border-t border-[#4d1e52]/35">
                      <td className="text-[16px] w-1/2 py-3 sm:py-3.5 text-center font-medium text-[#2d2531] border-r border-[#4d1e52]/40">
                        {row.minutes}
                      </td>
                      <td className="text-[16px] w-1/2 py-3 sm:py-3.5 text-center font-medium text-[#2d2531]">
                        {row.units}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-6 hidden lg:flex justify-center items-center py-4">
            <div className="w-full max-w-[420px] sm:max-w-[540px] drop-shadow-sm">
              <img
                src="/imgs/physical-therapy-page/pt%20billing%20difference.webp"
                alt="Physical therapist reviewing KX and CQ Medicare modifiers"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-white tracking-tight mb-5">
              PT Claims Carry Two Medicare Modifiers at Once
            </h3>

            <div className="text-[16px] leading-[1.6] space-y-4 text-white/90 font-normal">
              <p>
                No other therapy specialty applies the KX modifier and the CQ modifier to the same claim type.
              </p>
              <p>
                KX signals that therapy continues past the Medicare annual therapy threshold and that medical necessity documentation is on file. Claims over the threshold without it deny automatically.
              </p>
              <p>
                CQ identifies a PTA as the rendering provider on that claim line, which triggers the reduced payment rate. Applying it wrong doesn't deny the claim. It creates an overpayment that surfaces during an audit, sometimes years later.
              </p>
              <p>
                A PT practice with PTA staff and Medicare patients tracks a running threshold balance per patient and a delivery split per claim line, every visit, all year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
