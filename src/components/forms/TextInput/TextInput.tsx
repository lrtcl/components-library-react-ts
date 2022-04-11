import React, { ChangeEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TextInput.css";

type TextInputProps = {
  id?: string,
  type?: string,
  name: string,
  label: string,
  hideLabel?: boolean,
  placeholder?: string,
  value: string,
  onChange: ChangeEventHandler
}

const TextInput = ({
  id = `input-${uuidv4()}`,
  type = "text",
  name,
  label,
  hideLabel,
  placeholder,
  value,
  onChange
}: TextInputProps) => {
  return (
    <>
      {!hideLabel  && (
        <label htmlFor={id}>{label}</label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        aria-label={hideLabel ? label : undefined}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextInput;
