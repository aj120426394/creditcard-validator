import styled from 'styled-components';

export const OuterContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: ${(props) => props.theme.font.family.foundrySterling};
`;

export const InnerContainer = styled.section`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  
  @media (max-width: 1200px) {
    padding: 15px;
  }
`;

export const FlexboxCentered = "display: flex; align-items: center;";
