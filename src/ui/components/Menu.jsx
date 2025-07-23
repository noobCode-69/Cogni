import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../primitives/Button";
import {
  Command,
  EllipsisVertical,
  MoveLeft,
  MoveRight,
  ChevronsUpDown,
} from "lucide-react";
import styled from "styled-components";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useTrayPosition } from "../hooks/useTrayPosition";
import { usePopover } from "../hooks/usePopover";

const Menu = ({ moveTray }) => {
  const [isIncognito, setIsIncognito] = useState(false);
  const { trayPosition } = useTrayPosition();
  const { isOpen, toggle } = usePopover(1);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 15,
        left: rect.left - menuRect.width / 2 - trayPosition,
      });
    }
  }, [isOpen]);

  const quitApplication = () => {
    electronAPI.sendRendererEvent(EVENT_CONSTANTS.QUIT_APPLICATION);
  };

  const toggleIncognitoMode = () => {
    const newMode = !isIncognito;
    setIsIncognito(newMode);
    electronAPI.sendRendererEvent(
      EVENT_CONSTANTS.TOGGLE_INCOGNITO_MODE,
      newMode
    );
  };

  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={toggle}>
          <EllipsisVertical size={14} />
        </Button>
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <MenuContainer ref={menuRef} top={coords.top} left={coords.left}>
            <MenuHeader>
              <MenuTitle>Cogni</MenuTitle>
              {isIncognito ? <EyeOff size={13} /> : <Eye size={13} />}
            </MenuHeader>
            <Divider />
            <MenuActions>
              <StyledRow>
                Scroll Response
                <ShortcutGroup>
                  <ShortcutKey>
                    <Command size={9} />
                  </ShortcutKey>
                  <ShortcutKey>
                    <ChevronsUpDown size={9} />
                  </ShortcutKey>
                </ShortcutGroup>
              </StyledRow>

              <StyledRow>
                Clear Response
                <ShortcutGroup>
                  <ShortcutKey>
                    <Command size={9} />
                  </ShortcutKey>
                  <ShortcutKey>
                    <span style={{ fontSize: "0.6rem" }}>R</span>
                  </ShortcutKey>
                </ShortcutGroup>
              </StyledRow>
            </MenuActions>
            <Divider />

            <MenuActions>
              <ButtonGroup>
                <SolidButton onClick={() => moveTray(-1)}>
                  <ButtonFlex>
                    <MoveLeft size={9} />
                    <span>Left</span>
                  </ButtonFlex>
                </SolidButton>
                <SolidButton onClick={() => moveTray(1)}>
                  <ButtonFlex>
                    <span>Right</span>
                    <MoveRight size={9} />
                  </ButtonFlex>
                </SolidButton>
              </ButtonGroup>
              <SolidButton onClick={toggleIncognitoMode}>
                <CenteredText>
                  {isIncognito ? "Disable incognito" : "Go incognito"}
                </CenteredText>
              </SolidButton>
              <SolidButton onClick={quitApplication}>
                <CenteredText>Quit</CenteredText>
              </SolidButton>
            </MenuActions>
          </MenuContainer>,
          document.getElementById("root-portal")
        )}
    </>
  );
};

const SolidButton = styled(Button)`
  background-color: #3b3b3d;
  &:hover {
    background-color: #3b3b3d;
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 8px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
`;

const MenuTitle = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
`;

const Divider = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #3a3a3a;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  & > * {
    width: 100%;
  }
`;

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MenuActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: stretch;
`;

const CenteredText = styled.div`
  width: 100%;
  text-align: center;
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShortcutGroup = styled.div`
  display: flex;
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

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export default Menu;
