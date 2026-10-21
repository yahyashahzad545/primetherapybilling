import CardIcon from "@/components/about-us/CardIcon";

export type CredentialingDiscipline = {
  id: number;
  icon: string;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
};

export default function DisciplineCard({
  item,
}: {
  item: CredentialingDiscipline;
}) {
  return (
    // The card is a size container: on a narrow card the icon column shrinks so the text keeps most of the width
    <div className="@container relative flex h-full min-h-[320px] w-full flex-col pr-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute top-9 bottom-0 left-4 right-0 rounded-bl-[40px] bg-[#591e60]" />

      <div className="relative z-10 flex min-h-[88px] w-[82%] self-start items-center rounded-tr-[32px] bg-[#591e60] px-5 py-3 shadow-[5px_5px_8px_rgba(0,0,0,0.28)]">
        <h3 className="font-heading text-[18px] font-extrabold leading-[1.25] tracking-tight text-white">
          {item.title}
        </h3>
      </div>

      <div className="relative -mt-11 flex flex-1 items-center rounded-bl-[40px] bg-white pb-6 pl-5 pr-5 pt-[60px] shadow-[6px_6px_10px_rgba(0,0,0,0.3)]">
        <div className="flex w-12 flex-shrink-0 items-center justify-center @sm:w-[22%]">
          <CardIcon src={item.icon} className="h-12 w-12 scale-[1.5] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
        </div>

        <div className="ml-4 flex min-w-0 flex-1 flex-col justify-center border-l-[1.5px] border-[#591e60] pl-4 text-left">
          <p className="text-[16px] font-normal leading-[1.6] text-gray-700">
            {item.description}
          </p>

          {item.href && item.linkText && (
            <a
              href={item.href}
              className="mt-2 inline-block text-[16px] font-bold leading-tight text-[#d95959] transition-colors hover:text-[#b54c4c]"
            >
              {item.linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
