// @flow
import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { zDepth1 } from '../../styled-utils/shadow';

const OuterContainer = styled.div`
  ${zDepth1};
  width: 100%;
  height: 40px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  background-image: ${(props) => {
    if (props.valid === 'valid') {
      return 'linear-gradient(to right, #3ec8ac 0%, #4e90a4 100%), linear-gradient(to right, #3ec8ac 0%, #4e90a4 100%)';
    } else if (props.valid === 'invalid') {
      return 'linear-gradient(to right, #f44336 0%, #e91e63 100%), linear-gradient(to right, #f44336 0%, #e91e63 100%)';
    } else {
      return 'linear-gradient(to right, #c73ec8 0%, #75faf6 100%), linear-gradient(to right, #c73ec8 0%, #75faf6 100%)';
    }
  }};
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
  width: 5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: grey;
  z-index: 2;
  position: relative;
`;

const CaptionContainer = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  font-size: 0.8em;
  padding-left: 10px;
  box-sizing: border-box;
  color: red;
`;

export const InputBox = styled.input`
  position: relative;
  z-index: 2;
  border: none;
  width: 100%;
  height: 100%;
  background: transparent;
  appearance: textfield;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    font-size: 18px;
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
  font-size: 18px;

  &::placeholder {
    font-size: 18px;
  }
`;
type Valid = 'valid' | 'invalid' | 'matching';

type Props = {
  getValidResult?: (Valid) => void
};

type State = {
  icon: typeof faCcVisa,
  placeholder: string,
  shownValue: string,
  valid: Valid
};

export default class CreditCardInput extends React.Component<Props, State> {
  state = {
    icon: null,
    placeholder: 'Number on your credit card',
    shownValue: '',
    valid: 'matching'
  };
  input: ?HTMLInputElement;

  /**
   * Check for the card type and number of digits
   * @param {string} cardNum - card number
   * @return {[string, number]} - card type and number of digits
   */
  checkCreditCardTypeAndNumberOfDigits = (cardNum: string): [string, number] => {
    const regexAmex = /^(34|37)/;
    const regexDiscover = /^6011/;
    const regexMastercard = /^5[1-5]/;
    const regexVisa = /^4/;
    let numberOfDigits = 0;

    if (regexAmex.exec(cardNum) !== null) {
      // AMEX
      numberOfDigits = 15;
      return ['amex', numberOfDigits];
    } else if (regexDiscover.exec(cardNum) !== null) {
      // Discover
      numberOfDigits = 16;
      return ['discover', numberOfDigits];
    } else if (regexMastercard.exec(cardNum) !== null) {
      // Master
      numberOfDigits = 16;
      return ['master', numberOfDigits];
    } else if (regexVisa.exec(cardNum) !== null) {
      // Visa
      numberOfDigits = cardNum.length < 14 ? 13 : 16;
      return ['visa', numberOfDigits];
    } else {
      numberOfDigits = 0;
      return ['none', numberOfDigits];
    }
  };

  /**
   * Validate the card number.
   * @param {string} cardNum - User's input card number
   * @param {number} numberOfDigits - The number of the digits regards to card type.
   * @returns {string} - 'valid' | 'invalid' | 'matching'
   */
  cardValidation = (cardNum: string, numberOfDigits: number): Valid => {
    const startWith = /^[3456]/;
    // If first digits do not match the requirement
    if (cardNum.length !== 0 && startWith.exec(cardNum) === null) {
      return 'invalid';
    }
    // If user input more than 4 digits and there is no card type match
    if (cardNum.length >= 4 && numberOfDigits === 0) {
      return 'invalid';
    }

    if (cardNum.length !== numberOfDigits || cardNum.length === 0) {
      return 'matching';
    }
    return this.luhnMethod(cardNum) ? 'valid' : 'invalid';
  };

  /**
   * Using Luhn algorithm to validate the number.
   * @param {string} cardNum - User's input card number
   * @returns {boolean} - True if the card number is validated.
   */
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
    const [cardType, numberOfDigits] = this.checkCreditCardTypeAndNumberOfDigits(input);
    let placeholder = input.slice(0);
    let shownValue = input.slice(0);
    while (placeholder.length < numberOfDigits) {
      placeholder = placeholder + '0';
    }

    const valid = this.cardValidation(input, numberOfDigits);
    let icon = null;
    if (valid === 'invalid') {
      icon = faTimesCircle;
    } else {
      switch (cardType) {
        case 'amex':
          icon = faCcAmex;
          break;
        case 'discover':
          icon = faCcDiscover;
          break;
        case 'master':
          icon = faCcMastercard;
          break;
        case 'visa':
          icon = faCcVisa;
          break;
        default:
          icon = null;
      }
    }

    this.setState(
      (prevState) => {
        if (numberOfDigits === 0 || input.length <= numberOfDigits) {
          placeholder =
            input.length === 0 ? 'Number on your credit card' : this.formCardNumberToTemplate(placeholder, cardType);
          return {
            placeholder: placeholder,
            shownValue: this.formCardNumberToTemplate(shownValue, cardType),
            valid: valid,
            icon: icon
          };
        } else {
          return {};
        }
      },
      () => {
        if (this.props.getValidResult) {
          this.props.getValidResult(this.state.valid);
        }
      }
    );
  };

  onClickOnReset = () => {
    if (this.state.valid === 'invalid') {
      this.setState(
        {
          shownValue: '',
          placeholder: 'Number on your credit card',
          valid: 'matching',
          icon: null
        },
        () => {
          if (this.input) {
            this.input.focus();
          }
        }
      );
    }
  };

  render() {
    return (
      <OuterContainer valid={this.state.valid}>
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
          <IconContainer>
            {this.state.icon && (
              <FontAwesomeIcon
                icon={this.state.icon}
                size="lg"
                style={{ cursor: this.state.valid === 'invalid' ? 'pointer' : 'default' }}
                onClick={this.onClickOnReset}
              />
            )}
          </IconContainer>
        </InnerContainer>
        {this.state.valid === 'invalid' && <CaptionContainer>Invalid card number</CaptionContainer>}
      </OuterContainer>
    );
  }
}
