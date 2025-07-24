import Button from "../primitives/Button";
import styled from "styled-components";

const API = () => {
  return (
    <SolidButton>
      <ButtonContent>
        <span>API Key</span>
      </ButtonContent>
    </SolidButton>
  );
};

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
export default API;
