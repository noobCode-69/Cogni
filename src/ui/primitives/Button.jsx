import styled from "styled-components";
import { useMouseForwarding } from "../hooks/useMouseForwarding";
import { forwardRef, useImperativeHandle } from "react";

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

const Button = forwardRef(({ onClick, children, className }, forwardedRef) => {
  const internalRef = useMouseForwarding();

  useImperativeHandle(forwardedRef, () => internalRef.current);

  return (
    <StyledButton onClick={onClick} ref={internalRef} className={className}>
      {children}
    </StyledButton>
  );
});

export default Button;
