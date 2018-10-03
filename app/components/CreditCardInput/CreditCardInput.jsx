// @flow
import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
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
  placeholder: string
};

export default class CreditCardInput extends React.Component<Props, State> {
  state = {
    icon: null,
    placeholder: "0000 0000 000000"
  };
  input: ?HTMLInputElement;

  checkCreditCardType = (number) => {
    const regexAmex = /^(34|37)/;
    const regexDiscover = /^6011/;
    const regexMastercard = /^5[1-5]/;
    const regexVisa = /^4/;

    if (number.match(regexAmex) && number.match(regexAmex).length > 0) {
      // AMEX
      console.log('amex');
      this.setState({
        icon: faCcAmex
      });
    } else if (number.match(regexDiscover) && number.match(regexDiscover).length > 0) {
      // Discover
      console.log('discover');
      this.setState({
        icon: faCcDiscover
      });
    } else if (number.match(regexMastercard) && number.match(regexMastercard).length > 0) {
      // Master
      console.log('master');
      this.setState({
        icon: faCcMastercard
      });
    } else if (number.match(regexVisa) && number.match(regexVisa).length > 0) {
      // Visa
      console.log('visa');
      this.setState({
        icon: faCcVisa
      });
    } else {
      this.setState({
        icon: null
      });
    }
  };

  onInputChange = (e) => {
    console.log(e.target.value);
    const input = e.target.value;
    this.checkCreditCardType(input);
    this.setState({
      placeholder: input + " 0000"
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
            onChange={this.onInputChange}
          />
          <Placeholder placeholder={this.state.placeholder} />
          <IconContainer>{this.state.icon && <FontAwesomeIcon icon={this.state.icon} />}</IconContainer>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
