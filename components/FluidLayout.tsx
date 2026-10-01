import type { ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;
type FluidSectionProps = ComponentProps<"section"> & {
  spacing?: "compact" | "default";
};

export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={`mx-auto w-[92%] max-w-[1320px] ${className}`}
    />
  );
}

export function FluidSection({
  spacing = "default",
  className = "",
  ...props
}: FluidSectionProps) {
  const verticalSpacing =
    spacing === "compact"
      ? "py-[clamp(24px,4vw,48px)]"
      : "py-[clamp(48px,7vw,60px)]";

  return (
    <section
      {...props}
      className={`w-full ${verticalSpacing} ${className}`}
    />
  );
}
