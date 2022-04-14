import React, { FunctionComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import { GenericInputProps } from "../GenericInputProps";
import "../../../assets/styles/styles.css"
import "./TextInput.css";

export interface TextInputProps extends GenericInputProps {
  /**
   * The type of the `<input />`.
   */
  type?: "text" | "email" | "password" | "tel" | "url" | "search",
  /**
   * On touch devices, tells the browser which keyboard to display.
   */
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search" | "none",
  /**
   * WARNING: bad practice, avoid using! If `true`, the label will be visually hidden. For accessibility reasons, the label will still be announced by screen readers, thanks to the `aria-label` attribute.
   */
  hideLabel?: boolean,
  /**
   * The maximum length of the value.
   */
  maxLength?: number,
  /**
   * if `true`, and if `maxLength` has been defined, displays the character counter.
   */
  showCounter?: boolean,
  /**
   * Optional text for the character counter.
   */
  counterText?: string,
  /**
   * Determines if the counter displays the length of the current value, or the remaining characters.
   */
  counterVariant?: "used" | "remaining",
}

/**
Input element that creates a basic single-line text field.
Line-breaks are automatically removed from the input value.

ATTENTION: this is the correct input to use for numerical values, when there is a need for special formatting (eg. credit card number) and/or when a spin button is not usable or recommended (eg. phone number).

TODO:

- Add autocomplete support
- Complete the documentation.

REFERENCE:

- [https://css-tricks.com/better-form-inputs-for-better-mobile-user-experiences/](https://css-tricks.com/better-form-inputs-for-better-mobile-user-experiences/)
- [https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/](https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/)
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values)
- [https://design-system.service.gov.uk/components/text-input/](https://design-system.service.gov.uk/components/text-input/)
**/
const TextInput: FunctionComponent<TextInputProps> = ({
  id,
  type = "text",
  inputMode,
  label,
  hideLabel,
  helperText,
  maxLength,
  counterText = "",
  counterVariant = "used",
  showCounter,
  errorMessage,
  value = "",
  onChange,
  required,
  requiredText = "*",
  invalid,
  ...rest
}) => {
  // We make sure the default `id` is unique by using uuidv4
  if (!id) {
    id = `input-${uuidv4()}`;
  }

  // Generate the ids string for aria-describedby, based on the component props
  const generateAriaDescribedBy = () => {
    let ariaDescribedByIds: string[] = [];
    let ariaDescribedBy: string | undefined;
    if (invalid && errorMessage) {
      ariaDescribedByIds.push(`${id}-error`);
    }
    if (!invalid && helperText) {
      ariaDescribedByIds.push(`${id}-helper`);
    }
    if (maxLength && showCounter) {
      ariaDescribedByIds.push(`${id}-counter`);
    }
    if (ariaDescribedByIds.length > 0) {
      ariaDescribedBy = ariaDescribedByIds.join(" ");
    }
    return ariaDescribedBy;
  }

  // Calculate the value displayed in the counter
  const generateCounterValue = () => {
    let counterValue = 0;
    if (maxLength) {
      if (counterVariant === "used") {
        counterValue = value.length;
      } else if (counterVariant === "remaining") {
        counterValue = maxLength - value.length;
      }
    }
    return counterValue;
  }

  return (
    <div className="mylib--form-item mylib--textinput">
      {/* Input label */}
      {!hideLabel && (
        <label className="mylib--text-input__label" htmlFor={id}>
          {label}{required && <span className="mylib--textinput__required-text">{requiredText}</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={id}
        className="mylib--textinput__input"
        type={type}
        inputMode={inputMode}
        aria-label={hideLabel ? label : undefined}
        aria-describedby={generateAriaDescribedBy()}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={invalid}
        {...rest}
      />

      {/* Error text */}
      {errorMessage && invalid && (
        <div id={`${id}-error`} className="mylib--textinput__message mylib--textinput__error-message">
          {errorMessage}<span className="visually-hidden">.</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !invalid && (
        <div id={`${id}-helper`} className="mylib--textinput__message mylib--textinput__helper">
          {helperText}<span className="visually-hidden">.</span>
        </div>
      )}

      {/* Character counter */}
      {(maxLength && showCounter) && (
        <div id={`${id}-counter`} className="mylib--textinput__counter">
          {`${generateCounterValue()} / ${maxLength} ${counterText}`}<span className="visually-hidden">.</span>
        </div>
      )}
    </div>
  );
};

export default TextInput;
