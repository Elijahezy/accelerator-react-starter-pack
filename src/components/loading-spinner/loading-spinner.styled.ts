import React from 'react';
import styled, {keyframes} from 'styled-components';

export interface SpinnerProps {
  size?: number,
  borderWidth?: number,
  color?: string,
  margin?: string,
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  border: ${props => props.borderWidth}px solid ${props => props.color};
  border-top-color: transparent;
  animation: ${spin} 1s ease-in-out infinite;
  margin: ${props => props.margin};
`;

export const SpinnerWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%, -50%);
`;
