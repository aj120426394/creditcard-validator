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
  width: 90%;
  height: 100%;
  left: 9.8px;
  box-sizing: border-box;
  border: none;
`;
type Valid = 'valid' | 'invalid' | 'matching';

type Props = {};

type State = {
  icon: typeof faCcVisa,
  placeholder: string,
  shownValue: string,
  valid: Valid
};

export default class CreditCardInput extends React.Component<Props, State> {
  state = {
    icon: null,
    placeholder: '0000 0000 000000',
    shownValue: '',
    valid: 'matching'
  };
  input: ?HTMLInputElement;

  /**
   * Check for the card type
   * @param {string} number - card number
   * @return {string} - card type
   */
  checkCreditCardType = (number: string): string => {
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

  /**
   * Using Luhn algorithm to validate the number.
   * @param {string} cardNum - User's input card number
   * @returns {boolean} - True if the card number is validated.
   */
  cardValidation = (cardNum: string): Valid => {
    const startWith = /^[3456]/;

    // If first digits do not match the requirement
    if (!cardNum.match(startWith) || !(cardNum.match(startWith).length > 0)) {
      return 'invalid';
    }

    if (cardNum.length >= 2) {
    }

    return 'valid';
  };

  luhnMethod = (cardNum: string): boolean => {
    const validArray = [];
    let validResult = 0;
    for (let i = 0; i < cardNum.length; i++) {
      const index = cardNum.length - 1 - i;
      if ((i + 1) % 2 === 0) {
        validArray[index] = 2 * Number(cardNum.charAt(index));
      } else {
        validArray[index] = Number(cardNum.charAt(index));
      }
    }
    validArray.forEach((i) => {
      if (i >= 10) {
        validResult = validResult + (i % 10);
        validResult = validResult + 1;
      } else {
        validResult = validResult + i;
      }
    });
    return validResult % 10 === 0;
  };

  /**
   * Forming the input card number in the right format regards to the card type.
   * @param {string} cardNum - User's input card number.
   * @param {string} cardType - User's card type.
   * @returns {string} - Formatted card number.
   */
  formCardNumberToTemplate = (cardNum: string, cardType: string): string => {
    switch (cardType) {
      case 'amex':
        // 0000 000000 00000
        return `${cardNum.substring(0, 4)} ${cardNum.substring(4, 10)} ${cardNum.substring(10)}`.trim();
      case 'discover':
        // 0000 0000 0000 0000
        return `${cardNum.substring(0, 4)} ${cardNum.substring(4, 8)} ${cardNum.substring(8, 12)} ${cardNum.substring(
          12
        )}`.trim();
      case 'master':
        // 0000 0000 0000 0000
        return `${cardNum.substring(0, 4)} ${cardNum.substring(4, 8)} ${cardNum.substring(8, 12)} ${cardNum.substring(
          12
        )}`.trim();
      case 'visa':
        // 0000 0000 0000 0000
        // 0000 0000 0000 0
        return `${cardNum.substring(0, 4)} ${cardNum.substring(4, 8)} ${cardNum.substring(8, 12)} ${cardNum.substring(
          12
        )}`.trim();
      default:
        return cardNum;
    }
  };

  onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\s/g, '').trim();
    console.log(`input value: ${input.slice(0)}`);
    const cardType = this.checkCreditCardType(input);
    let numberOfDigits = 0;
    let placeholder = input.slice(0);
    let shownValue = input.slice(0);

    switch (cardType) {
      case 'amex':
        // 0000 000000 00000
        numberOfDigits = 15;
        break;
      case 'discover':
        // 0000 0000 0000 0000
        numberOfDigits = 16;
        break;
      case 'master':
        // 0000 0000 0000 0000
        numberOfDigits = 16;
        break;
      case 'visa':
        // 0000 0000 0000 0000
        // 0000 0000 0000 0
        numberOfDigits = input.length < 14 ? 13 : 16;
        break;
      case 'none':
        break;
      default:
    }

    while (placeholder.length < numberOfDigits) {
      placeholder = placeholder + '0';
    }

    this.setState((prevState) => {
      if (numberOfDigits === 0 || input.length <= numberOfDigits) {
        return {
          placeholder: this.formCardNumberToTemplate(placeholder, cardType),
          shownValue: this.formCardNumberToTemplate(shownValue, cardType)
        };
      } else {
        return {};
      }
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
            type="tel"
            maxlength="5"
            value={this.state.shownValue}
            onChange={this.onInputChange}
          />
          <Placeholder placeholder={this.state.placeholder} />
          <IconContainer>{this.state.icon && <FontAwesomeIcon icon={this.state.icon} />}</IconContainer>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
