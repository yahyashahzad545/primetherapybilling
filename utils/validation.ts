export type ValidationField = {
  type: string;
  required: boolean;
  value: string;
  checked?: boolean;
};

// The ten national digits, without the +1 country code.
// US area codes never start with 1, so a leading 1 can only be the country code.
export function getUsPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^1+/, "").slice(0, 10);
}

// Formats as "+1 (555) 123-4567": the US country code, then at most ten digits.
export function formatUsPhoneNumber(value: string): string {
  const digits = getUsPhoneDigits(value);

  // Typing a bare "1" first is the country code, not a digit of the number.
  if (!digits) return /^\s*1/.test(value) ? "+1 (" : "";
  if (digits.length <= 3) return `+1 (${digits}`;
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;

  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function normalizeFieldInput(
  type: string,
  name: string,
  value: string,
  onBlur = false
): string {
  if (type === "tel" || /phone/i.test(name)) {
    return formatUsPhoneNumber(value);
  }

  if (type === "email") {
    return value.replace(/\s/g, "");
  }

  if (type === "text" || type === "textarea") {
    const normalized = value.replace(/[ \t]{2,}/g, " ").replace(/^[ \t]+/gm, "");
    return onBlur
      ? normalized.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim()
      : normalized;
  }

  return value;
}

export function getValidationError(field: ValidationField): string | undefined {
  const value = field.value.trim();

  if (field.type === "checkbox") {
    return field.required && !field.checked ? "This field is required." : undefined;
  }

  if (!value) {
    return field.required ? "This field is required." : undefined;
  }

  if (field.type === "email") {
    const validEmail = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)*\.[A-Z]{2,63}$/i;
    return validEmail.test(value) ? undefined : "Please enter a valid email address.";
  }

  if (field.type === "tel") {
    return getUsPhoneDigits(value).length === 10
      ? undefined
      : "Please enter a valid 10-digit phone number.";
  }

  return undefined;
}
