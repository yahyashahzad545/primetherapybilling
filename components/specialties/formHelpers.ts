import { formatUsPhoneNumber } from "@/utils/validation";

// ─── Phone Formatting Helper ────────────────────────────────────────────────
export function formatPhone(value: string): string {
  return formatUsPhoneNumber(value);
}

export const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#d95959";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(89,30,96,0.15)";
};
export const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.boxShadow = "none";
};

export const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm text-gray-700 bg-white transition-all duration-200 placeholder-gray-400";
export const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

