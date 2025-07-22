import styled from "styled-components";
import { useMouseForwarding } from "../hooks/useMouseForwarding";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const IconButton = ({ onClick, disappearing, children, className }) => {
  const ref = useMouseForwarding(disappearing);

  const handleClick = () => {
    if (disappearing) {
      electronAPI.sendRendererEvent(EVENT_CONSTANTS.MOUSE_FORWARDING, "EXIT");
    }
    onClick();
  };

  return (
    <StyledIconButton onClick={handleClick} ref={ref} className={className}>
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.div`
  background: transparent;
  padding: 5px;
  border-radius: 4px;
  color: #fff;
  transition: background 0.2s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

export default IconButton;
