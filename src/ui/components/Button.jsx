import styled from "styled-components";
import { useMouseForwarding } from "../hooks/useMoveForwarding";

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

export const Button = ({ onClick, children, className }) => {
  const ref = useMouseForwarding();

  return (
    <StyledButton onClick={onClick} ref={ref} className={className}>
      {children}
    </StyledButton>
  );
};
