import Button from "../primitives/Button";
import { Command, CornerDownLeft } from "lucide-react";
import styled from "styled-components";
import { Slash } from "lucide-react";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";
import Menu from "./Menu";
import { useEffect, useState } from "react";
const FixedCenteredContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border: 0.9px solid #3a3a3a;
  border-radius: 4px;
  width: fit-content;
  padding: 4px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 4px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShortcutGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ShortcutKey = styled.div`
  background: #2a2a2a;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SolidButton = styled(Button)`
  background-color: rgba(19, 115, 230, 0.7);

  &:hover {
    background-color: rgba(0, 86, 179, 0.7);
  }
`;

const Tray = () => {
  const [currentX, setCurrentX] = useState(0);

  const toggleVisibility = () => {
    electronAPI.sendRendererEvent(EVENT_CONSTANTS.TOGGLE_VISIBILITY);
  };

  const moveTray = (direction) => {
    const root = document.getElementById("app-container");
    if (!root) return;

    const newX = currentX + 50 * direction;
    setCurrentX(newX);
    root.style.transform = `translateX(${newX}px)`;
  };

  return (
    <FixedCenteredContainer>
      <SolidButton>
        <ButtonContent>
          <span>API Keys</span>
        </ButtonContent>
      </SolidButton>
      <Button>
        <ButtonContent>
          <span>Ask</span>
          <ShortcutGroup>
            <ShortcutKey>
              <Command size={9} />
            </ShortcutKey>
            <ShortcutKey>
              <CornerDownLeft size={9} />
            </ShortcutKey>
          </ShortcutGroup>
        </ButtonContent>
      </Button>
      <Button onClick={toggleVisibility}>
        <ButtonContent>
          <span>Hide</span>
          <ShortcutGroup>
            <ShortcutKey>
              <Command size={9} />
            </ShortcutKey>
            <ShortcutKey
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              <Slash size={9} />
            </ShortcutKey>
          </ShortcutGroup>
        </ButtonContent>
      </Button>
      <Menu moveTray={moveTray} />
    </FixedCenteredContainer>
  );
};

export default Tray;
