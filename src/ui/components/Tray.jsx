import { Button } from "./Button";
import { Command, CornerDownLeft } from "lucide-react";
import styled from "styled-components";
import { Slash } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

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
  align-items: center;
  justify-content: center;
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
  background: #3a3a3a;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tray = () => {
  return (
    <FixedCenteredContainer>
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
      <Button>
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
      <Button>
        <EllipsisVertical size={14} />
      </Button>
    </FixedCenteredContainer>
  );
};

export default Tray;
