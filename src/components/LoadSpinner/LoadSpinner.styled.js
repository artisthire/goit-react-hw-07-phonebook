import styled, { keyframes } from 'styled-components';
import { ImSpinner9 } from 'react-icons/im';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

export const LoadingIcon = styled(ImSpinner9)`
  display: block;
  width: 60px;
  height: 60px;
  margin: 30px auto;
  color: #7a82b5;

  animation: ${rotate} 1s linear infinite;
`;
