import Button from "../primitives/Button";
import { Command } from "lucide-react";
import styled from "styled-components";
import { Slash } from "lucide-react";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const Hide = () => {
  const toggleVisibility = () => {
    electronAPI.sendRendererEvent(EVENT_CONSTANTS.TOGGLE_VISIBILITY);
  };

  return (
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
  );
};

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

export default Hide;
