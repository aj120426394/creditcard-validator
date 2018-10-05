import React from 'react';
import styled from 'styled-components';
import CreditCardInput from './components/CreditCardInput/CreditCardInput';

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cccccc;
`;

const InputContainer = styled.div`
  width: 50%;
`;

const getValidResult = (validResult) => {
  console.log(validResult)
};

const RootContainer = () => (
  <Container>
    <InputContainer>
      <CreditCardInput getValidResult={getValidResult} />
    </InputContainer>
  </Container>
);

export default RootContainer;
