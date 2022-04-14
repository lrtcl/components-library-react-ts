import { ChangeEventHandler } from "react";

export interface GenericInputProps extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * A custom `id` for the `<input />`.
   * By default, a unique id is generated using uuidv4.
   */
  id?: string,
  /**
   * The text displayed and read by a screen reader when visiting the control.
   */
  label: string,
  /**
   * Optional text to help the user filling the input with correct data.
   */
  helperText?: string,
  /**
   * The message displayed when a validation error occurs. Must be self-explanatory to allow easy correction.
   */
  errorMessage: string,
  /**
   * Marks the input as mandatory.
   */
  required?: boolean,
  /**
   * Optional text or symbol that will indicate the required status.
   */
  requiredText?: string,
  /**
   * The value of the `<input />`.
   */
  value?: string,
  /**
   * If `true`, the input will be marked as invalid and will show an error.
   */
  invalid?: boolean,
  /**
   * Optional `onChange` event that is called  whenever the `<input />` is updated.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
}
