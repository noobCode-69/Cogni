import styled from "styled-components";
import { useMouseForwarding } from "../hooks/useMouseForwarding";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const Button = ({
  onClick,
  shouldAllowMouseForwarding = true,
  disappearing,
  children,
  className,
}) => {
  const ref = useMouseForwarding(disappearing);

  const handleClick = () => {
    if (disappearing) {
      electronAPI.sendRendererEvent(EVENT_CONSTANTS.MOUSE_FORWARDING, "EXIT");
    }
    onClick();
  };

  return (
    <StyledButton
      onClick={handleClick}
      ref={shouldAllowMouseForwarding ? ref : null}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  background: transparent;
  padding: 5px 10px;
  border-radius: 4px;
  color: #fff;
  transition: background 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

export default Button;
