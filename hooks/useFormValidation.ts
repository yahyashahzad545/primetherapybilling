import { useState } from "react";
import { getValidationError, type ValidationField } from "@/utils/validation";

export type ValidationErrors = Record<string, string>;

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    key: string,
    field: ValidationField,
    markTouched = false
  ) => {
    const error = getValidationError(field);

    if (markTouched) {
      setTouched((current) => ({ ...current, [key]: true }));
    }

    setErrors((current) => {
      if (error) return { ...current, [key]: error };
      if (!(key in current)) return current;

      const next = { ...current };
      delete next[key];
      return next;
    });

    return error;
  };

  const validateAll = (fields: Array<[string, ValidationField]>) => {
    const nextErrors: ValidationErrors = {};
    const nextTouched: Record<string, boolean> = {};

    for (const [key, field] of fields) {
      nextTouched[key] = true;
      const error = getValidationError(field);
      if (error) nextErrors[key] = error;
    }

    setTouched(nextTouched);
    setErrors(nextErrors);
    return nextErrors;
  };

  const validateChange = (key: string, field: ValidationField) => {
    if (touched[key] || errors[key]) {
      validateField(key, field);
    }
  };

  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  return { errors, validateField, validateAll, validateChange, resetValidation };
}
