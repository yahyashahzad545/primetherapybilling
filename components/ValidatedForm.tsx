"use client";

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useId,
  useRef,
} from "react";
import type {
  ComponentProps,
  FormEvent,
  ReactElement,
  ReactNode,
} from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { normalizeFieldInput, type ValidationField } from "@/utils/validation";

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type FormProps = Omit<ComponentProps<"form">, "onSubmit" | "noValidate"> & {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};
type ChildProps = {
  children?: ReactNode;
  name?: string;
  id?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  checked?: boolean;
  defaultChecked?: boolean;
  "data-validation-key"?: string;
  onChange?: (event: React.ChangeEvent<FormControl>) => void;
  onBlur?: (event: React.FocusEvent<FormControl>) => void;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function toValidationField(control: FormControl): ValidationField {
  return {
    type: control instanceof HTMLTextAreaElement ? "textarea" : control.type,
    required: control.required,
    value: control.value,
    checked: control instanceof HTMLInputElement ? control.checked : undefined,
  };
}

function setControlValue(control: FormControl, value: string, dispatch = false) {
  if (control instanceof HTMLInputElement) {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(control, value);
  } else if (control instanceof HTMLTextAreaElement) {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set?.call(control, value);
  } else {
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set?.call(control, value);
  }

  if (dispatch) {
    control.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

export function ValidatedForm({ onSubmit, children, ...formProps }: FormProps) {
  const formId = useId().replace(/:/g, "");
  const fieldIndex = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const { errors, validateField, validateAll, validateChange, resetValidation } =
    useFormValidation();

  fieldIndex.current = 0;

  const enhanceChildren = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (!isValidElement<ChildProps>(node)) return node;

      const element = node as ReactElement<ChildProps>;
      const tagName = typeof element.type === "string" ? element.type : "";
      const props = element.props;

      if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        const index = fieldIndex.current++;
        const key = props.name || props.id || `field-${index}`;
        const inputId = props.id || `${formId}-${key}`;
        const errorId = `${inputId}-error`;
        const error = errors[key];
        const describedBy = [props["aria-describedby"], error ? errorId : undefined]
          .filter(Boolean)
          .join(" ");
        const originalOnChange = props.onChange;
        const originalOnBlur = props.onBlur;

        const handleChange: React.ChangeEventHandler<FormControl> = (event) => {
          const control = event.currentTarget;
          const normalizedValue = normalizeFieldInput(
            control instanceof HTMLTextAreaElement ? "textarea" : control.type,
            control.name || key,
            control.value
          );

          if (normalizedValue !== control.value) {
            setControlValue(control, normalizedValue);
          }

          originalOnChange?.(event);
          validateChange(key, toValidationField(control));
        };

        const handleBlur: React.FocusEventHandler<FormControl> = (event) => {
          const control = event.currentTarget;
          const normalizedValue = normalizeFieldInput(
            control instanceof HTMLTextAreaElement ? "textarea" : control.type,
            control.name || key,
            control.value,
            true
          );

          if (normalizedValue !== control.value) {
            setControlValue(control, normalizedValue, true);
          }

          originalOnBlur?.(event);
          validateField(key, toValidationField(control), true);
        };

        return (
          <Fragment key={inputId}>
            {cloneElement(element, {
              id: inputId,
              "data-validation-key": key,
              maxLength: props.type === "tel" ? undefined : props.maxLength,
              "aria-invalid": error ? true : props["aria-invalid"],
              "aria-describedby": describedBy || undefined,
              onChange: handleChange,
              onBlur: handleBlur,
            })}
            {error && (
              // A checkbox sits in a row with its label text, so its message drops to a line of
              // its own under that row (the row needs flex-wrap) instead of landing between the two
              <span
                id={errorId}
                role="alert"
                className={`mt-1 block text-[11px] leading-tight text-red-600 ${
                  props.type === "checkbox" ? "order-last basis-full" : ""
                }`}
              >
                {error}
              </span>
            )}
          </Fragment>
        );
      }

      if (props.children === undefined) return node;
      return cloneElement(element, undefined, enhanceChildren(props.children));
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const controls = Array.from(
      form.querySelectorAll<FormControl>("input, textarea, select")
    ).filter((control) => !control.disabled && control.type !== "submit" && control.type !== "button" && control.type !== "hidden");

    let normalizedAny = false;
    for (const control of controls) {
      const normalizedValue = normalizeFieldInput(
        control instanceof HTMLTextAreaElement ? "textarea" : control.type,
        control.name || control.dataset.validationKey || "",
        control.value,
        true
      );
      if (normalizedValue !== control.value) {
        setControlValue(control, normalizedValue, true);
        normalizedAny = true;
      }
    }

    const fields: Array<[string, ValidationField]> = controls.map((control) => [
      control.dataset.validationKey || control.name || control.id,
      toValidationField(control),
    ]);
    const nextErrors = validateAll(fields);
    const firstInvalidKey = fields.find(([key]) => nextErrors[key])?.[0];

    if (firstInvalidKey) {
      form.querySelector<FormControl>(`[data-validation-key="${CSS.escape(firstInvalidKey)}"]`)?.focus();
      return;
    }

    if (normalizedAny) {
      const nativeEvent = event.nativeEvent as SubmitEvent;
      const submitter = nativeEvent.submitter;
      requestAnimationFrame(() => {
        const activeForm = formRef.current;
        if (!activeForm) return;
        if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
          activeForm.requestSubmit(submitter);
        } else {
          activeForm.requestSubmit();
        }
      });
      return;
    }

    resetValidation();
    onSubmit?.(event);
  };

  return (
    // method="post" is a safety net: if the form is submitted before React has attached its handler,
    // the browser falls back to a native submit, and a GET would put every field in the page URL.
    <form method="post" {...formProps} ref={formRef} noValidate onSubmit={handleSubmit}>
      {enhanceChildren(children)}
    </form>
  );
}
