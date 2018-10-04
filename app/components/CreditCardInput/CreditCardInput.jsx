// @flow
import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { zIndex2 } from '../../styled-utils/depth';

const OuterContainer = styled.div`
  width: 100%;
  height: 35px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 5px;
  background-image: linear-gradient(to right, #3ec8ac 0%, #4e90a4 100%),
    linear-gradient(to right, #3ec8ac 0%, #4e90a4 100%);
`;

const InnerContainer = styled.div`
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-around;
  padding: 0 10px;
  position: relative;
`;
const IconContainer = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  z-index: 2;
  position: relative;
`;

const InputBox = styled.input`
  position: relative;
  z-index: 2;
  border: none;
  width: 100%;
  height: 100%;
  background: transparent;
  appearance: textfield;
  &:focus {
    outline: none;
  }
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const Placeholder = styled.input`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 9.8px;
  box-sizing: border-box;
  border: none;
`;

type Props = {};

type State = {
  icon: typeof faCcVisa,
  placeholder: string,
  numberOfDigits: number,
  inputValue: number
};

export default class CreditCardInput extends React.Component<Props, State> {
  state = {
    icon: null,
    placeholder: '0000 0000 000000',
    numberOfDigits: 0,
    inputValue: ''
  };
  input: ?HTMLInputElement;

  /**
   * Check for the card type
   * @param {string} number - card number
   * @return {string} - card type
   */
  checkCreditCardType = (number: string) => {
    const regexAmex = /^(34|37)/;
    const regexDiscover = /^6011/;
    const regexMastercard = /^5[1-5]/;
    const regexVisa = /^4/;

    if (number.match(regexAmex) && number.match(regexAmex).length > 0) {
      // AMEX
      return 'amex';
    } else if (number.match(regexDiscover) && number.match(regexDiscover).length > 0) {
      // Discover
      return 'discover';
    } else if (number.match(regexMastercard) && number.match(regexMastercard).length > 0) {
      // Master
      return 'master';
    } else if (number.match(regexVisa) && number.match(regexVisa).length > 0) {
      // Visa
      return 'visa';
    } else {
      return 'none';
    }
  };

  onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cardType = this.checkCreditCardType(input);
    let numberOfDigits = 0;
    switch (cardType) {
      case 'amex':
        // 0000 000000 00000
        numberOfDigits = 15;
        break;
      case 'discover':
        // 0000 0000 0000 0000
        numberOfDigits = 15;

        break;
      case 'master':
        // 0000 0000 0000 0000
        numberOfDigits = 15;

        break;
      case 'visa':
        // 0000 0000 0000 0000
        // 0000 0000 0000 0

        break;
      case 'none':
        break;
      default:

    }
    this.setState({
      placeholder: input + ' 0000'
    });
  };

  render() {
    return (
      <OuterContainer>
        <InnerContainer>
          <InputBox
            innerRef={(ref) => {
              this.input = ref;
            }}
            type="number"
            maxlength="5"
            value={this.state.inputValue}
            onChange={this.onInputChange}
          />
          <Placeholder placeholder={this.state.placeholder} />
          <IconContainer>{this.state.icon && <FontAwesomeIcon icon={this.state.icon} />}</IconContainer>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
