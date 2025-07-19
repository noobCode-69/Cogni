import styled from "styled-components";
import { useMouseForwarding } from "../hooks/useMouseForwarding";

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

const Button = ({ onClick, children, className }, forwardedRef) => {
  const ref = useMouseForwarding();

  return (
    <StyledButton
      role="button"
      onClick={onClick}
      ref={ref}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
