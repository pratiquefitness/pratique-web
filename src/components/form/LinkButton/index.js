import { Colors } from "../../assets/colors";
import { Button, WrapperButton } from "./styles";

function LinkButton({
  to,
  text,
  onClick,
  disabled,
  bgColor = Colors.red_light,
  textColor = Colors.white,
  borderColor = bgColor,
}) {
  return (
    <WrapperButton>
      <Button
        type="submit"
        bgColor={bgColor}
        textColor={textColor}
        disabled={disabled}
        onClick={onClick}
        to={disabled ? null : to}
        borderColor={borderColor}
      >
        {text}
      </Button>
    </WrapperButton>
  );
}

export default LinkButton;
