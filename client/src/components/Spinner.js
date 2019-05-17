import React from 'react';
import styled from 'styled-components';

function Spinner() {
  return (
    <SpinnerContainer>
      <img src='img/Facebook-1s-200px.svg' alt='Loading' />
    </SpinnerContainer>
  )
};

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8000;
`;

export default Spinner;
