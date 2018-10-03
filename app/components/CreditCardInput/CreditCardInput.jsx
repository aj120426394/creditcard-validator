// @flow
import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';

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
  
  > input {
    border: none;
    width: 100%;
    height: 100%;
    appearance: textfield;
    &:focus {
      outline: none;
    }
    &::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;
const IconContainer = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
`;



export default class CreditCardInput extends React.Component {
  state = {
    icon: null
  };

  checkCreditCardType = (number) => {
    const regexAmex = /^(34|37)/;
    const regexDiscover = /^6011/;
    const regexMastercard = /^5[1-5]/;
    const regexVisa = /^4/;

    if (number.match(regexAmex) && number.match(regexAmex).length > 0) {
      console.log('amex');
      this.setState({
        icon: faCcAmex
      });
    } else if (number.match(regexDiscover) && number.match(regexDiscover).length > 0) {
      console.log('discover')
      this.setState({
        icon: faCcDiscover
      });
    } else if (number.match(regexMastercard) && number.match(regexMastercard).length > 0){
      console.log('master')
      this.setState({
        icon: faCcMastercard
      });
    } else if (number.match(regexVisa) && number.match(regexVisa).length > 0){
      console.log('visa')
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
    console.log(typeof input);
    this.checkCreditCardType(input)
  };

  render() {
    return (
      <OuterContainer>
        <InnerContainer>
          <input type="number" placeholder="0000 0000 000000" onChange={this.onInputChange}/>
          <IconContainer>
            {this.state.icon && (<FontAwesomeIcon icon={this.state.icon}></FontAwesomeIcon>)}


          </IconContainer>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
