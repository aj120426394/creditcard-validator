// @flow
import * as React from 'react';
import styled from 'styled-components';
import { zDepth1 } from '../../styled-utils/shadow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OuterContainer = styled.div`
  ${zDepth1};
  width: 100%;
  height: 40px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 5px;
  background-image: ${(props) => {
    if (props.gradient) {
      if (props.direction) {
        return `linear-gradient(${props.direction}, ${props.fromColor} 0%, ${
          props.toColor
        } 100%), linear-gradient(to right, ${props.fromColor} 0%, ${props.toColor} 100%)`;
      } else {
        return `linear-gradient(${props.direction}, ${props.fromColor} 0%, ${
          props.toColor
        } 100%), linear-gradient(to right, ${props.fromColor} 0%, ${props.toColor} 100%)`;
      }
    } else {
      return '';
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

type Props = {
  gradient: string,
  fromColor: string,
  toColor: string,
  direction: string,
  onInputChange: () => void,
  onItemClick: () => void,
  inputType: string
};

type State = {
  shownValue: string
}

class GradientInput extends React.Component<Props> {
  static defaultProps = {};
  state = {
    shownValue: ''
  };
  input: ?HTMLInputElement;

  onInputChange = (e:SyntheticEvent<HTMLInputElement>) => {
    let input = e.target.value;
    this.props.onInputChange(e);
    this.setState({
      shownValue: input
    })
  };

  render() {
    return (
      <OuterContainer
        gradient={this.props.gradient}
        fromColor={this.props.fromColor}
        toColor={this.props.toColor}
        direction={this.props.direction}
      >
        <InnerContainer>
          <InputBox
            innerRef={(ref) => {
              this.input = ref;
            }}
            type={this.props.inputType}
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
                onClick={this.props.onItemClick}
              />
            )}
          </IconContainer>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default GradientInput;
