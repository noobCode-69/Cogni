import Button from "../primitives/Button";
import styled from "styled-components";
import Menu from "./Menu";
import Chat from "./Chat/Chat";
import { useTrayPosition } from "../hooks/useTrayPosition";
import Hide from "./Hide";

const Tray = () => {
  const { trayPosition, setTrayPosition } = useTrayPosition();

  const moveTray = (direction) => {
    const root = document.getElementById("app-container");
    if (!root) return;
    const newX = trayPosition + 100 * direction;
    setTrayPosition(newX);
    root.style.transform = `translateX(${newX}px)`;
  };

  return (
    <FixedCenteredContainer>
      <SolidButton>
        <ButtonContent>
          <span>API Key</span>
        </ButtonContent>
      </SolidButton>
      <Chat />
      <Hide />
      <Menu moveTray={moveTray} />
    </FixedCenteredContainer>
  );
};

const FixedCenteredContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border: 0.9px solid #3a3a3a;
  border-radius: 4px;
  width: fit-content;
  padding: 4px;
  background: rgba(0, 0, 0, 0.5);
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

const SolidButton = styled(Button)`
  background-color: rgba(19, 115, 230, 0.7);

  &:hover {
    background-color: rgba(0, 86, 179, 0.7);
  }
`;

export default Tray;
