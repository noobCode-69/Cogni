import styled, { keyframes } from "styled-components";

const LoadingDots = () => (
  <LoadingWrapper>
    <LoadingText>Thinking</LoadingText>
    <Dot />
    <Dot />
    <Dot />
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  width: fit-content;
`;

const dotAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const Dot = styled.span`
  animation: ${dotAnimation} 0.5s ease-in-out infinite;
  background-color: white;
  display: inline-block;
  height: 6px;
  width: 6px;
  margin: 2px;
  border-radius: 50%;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }
`;

const LoadingText = styled.span`
  margin-right: 4px;
`;

export default LoadingDots;
