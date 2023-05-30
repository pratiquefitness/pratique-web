import { useState } from "react";
import { InputForm, PasswordInputContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../assets/colors";

function Input({
  type,
  name,
  placeholder,
  handleOnChange,
  value,
  required = false,
}) {
  return (
    <InputForm
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      onChange={handleOnChange}
      value={value}
      required={required}
    />
  );
}

function PasswordInput({
  name,
  placeholder,
  handleOnChange,
  value,
  required = false,
}) {
  const [visible, setVisible] = useState(false);

  const changeVisibility = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <PasswordInputContainer>
      <InputForm
        type={visible ? "text" : "password"}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
      />
      <button onClick={changeVisibility}>
        <FontAwesomeIcon
          icon={visible ? faEyeSlash : faEye}
          color={Colors.white}
        />
      </button>
    </PasswordInputContainer>
  );
}

export { PasswordInput };

export default Input;
