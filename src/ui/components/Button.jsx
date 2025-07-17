import { useMouseHover } from "../hooks/useMoveOver";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

import styled from "styled-components";
import { electronAPI } from "../utils";

const StyledButton = styled.div`
  background: transparent;
  padding: 5px 10px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

export const Button = ({ onClick, children }) => {
  const hoverRef = useMouseHover(
    () => {
      electronAPI.sendRendererEvent(
        EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS,
        "ENTER"
      );
    },
    () => {
      electronAPI.sendRendererEvent(
        EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS,
        "EXIT"
      );
    }
  );

  return (
    <StyledButton onClick={onClick} ref={hoverRef}>
      {children}
    </StyledButton>
  );
};
