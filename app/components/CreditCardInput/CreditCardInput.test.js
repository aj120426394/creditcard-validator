// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import CreditCardInput, { InputBox } from './CreditCardInput';

describe('CreditCardInput: ', () => {
  const mountWrapper = mount(<CreditCardInput />);

  test('render: Snapshot test', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  test('card validator', () => {
    const validator = mountWrapper.instance().cardValidation;
    expect(validator('4111111111111111', 16)).toBe('valid');
    expect(validator('4111111111111', 13)).toBe('invalid');
    expect(validator('4012888888881881', 16)).toBe('valid');
    expect(validator('378282246310005', 15)).toBe('valid');
    expect(validator('6011111111111117', 16)).toBe('valid');
    expect(validator('60185', 0)).toBe('invalid');
    expect(validator('5105105105105100', 16)).toBe('valid');
    expect(validator('5105105105105106', 16)).toBe('invalid');
    expect(validator('9111111111111111', 0)).toBe('invalid');
    expect(validator('40523', 13)).toBe('matching');
  });

  test('card type checker', () => {
    const checker = mountWrapper.instance().checkCreditCardTypeAndNumberOfDigits;
    expect(checker('4111111111111111')).toEqual(['visa', 16]);
    expect(checker('4111111111111')).toEqual(['visa', 13]);
    expect(checker('4012888888881881')).toEqual(['visa', 16]);
    expect(checker('378282246310005')).toEqual(['amex', 15]);
    expect(checker('6011111111111117')).toEqual(['discover', 16]);
    expect(checker('5105105105105100')).toEqual(['master', 16]);
    expect(checker('5105105105105106')).toEqual(['master', 16]);
    expect(checker('9111111111111111')).toEqual(['none', 0]);
    expect(checker('40523')).toEqual(['visa', 13]);
  });

  test('luhn algorithm', () => {
    const luhnMethod = mountWrapper.instance().luhnMethod;
    expect(luhnMethod('5105105105105100')).toBe(true);
    expect(luhnMethod('5105105105105106')).toBe(false);
  });

  test('format card number into template', () => {
    const formCardNumberToTemplate = mountWrapper.instance().formCardNumberToTemplate;
    expect(formCardNumberToTemplate('4111111111111111', 'visa')).toBe('4111 1111 1111 1111');
    expect(formCardNumberToTemplate('4111111111111', 'visa')).toBe('4111 1111 1111 1');
    expect(formCardNumberToTemplate('378282246310005', 'amex')).toBe('3782 822463 10005');
    expect(formCardNumberToTemplate('6011111111111117', 'discover')).toBe('6011 1111 1111 1117');
    expect(formCardNumberToTemplate('5105105105105100', 'master')).toBe('5105 1051 0510 5100');
    expect(formCardNumberToTemplate('9111111111111111', 'none')).toBe('9111111111111111');
  });

  describe('Interaction: User ', () => {
    const inputBox = mountWrapper.find(InputBox);

    test('input number that is Visa card', () => {
      const inputValue = '41111111111';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('4111 1111 1110 0');
      expect(mountWrapper.state('shownValue')).toBe('4111 1111 111');
      expect(mountWrapper.state('icon')).toBe(faCcVisa);

      const inputValue2 = '4111111111111111';
      inputBox.simulate('change', { target: { value: inputValue2 } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('4111 1111 1111 1111');
      expect(mountWrapper.state('shownValue')).toBe('4111 1111 1111 1111');
      expect(mountWrapper.state('icon')).toBe(faCcVisa);


      const inputValue3 = '4111111111111112';
      inputBox.simulate('change', { target: { value: inputValue3 } });
      expect(mountWrapper.state('valid')).toBe('invalid');
      expect(mountWrapper.state('placeholder')).toBe('4111 1111 1111 1112');
      expect(mountWrapper.state('shownValue')).toBe('4111 1111 1111 1112');
      expect(mountWrapper.state('icon')).toBe(faTimesCircle);

    });

    test('input number that is Amex card', () => {
      const inputValue = '37828224631';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('3782 822463 10000');
      expect(mountWrapper.state('shownValue')).toBe('3782 822463 1');
      expect(mountWrapper.state('icon')).toBe(faCcAmex);


      const inputValue2 = '378282246310005';
      inputBox.simulate('change', { target: { value: inputValue2 } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('3782 822463 10005');
      expect(mountWrapper.state('shownValue')).toBe('3782 822463 10005');
      expect(mountWrapper.state('icon')).toBe(faCcAmex);

      const inputValue3 = '378282246310008';
      inputBox.simulate('change', { target: { value: inputValue3 } });
      expect(mountWrapper.state('valid')).toBe('invalid');
      expect(mountWrapper.state('placeholder')).toBe('3782 822463 10008');
      expect(mountWrapper.state('shownValue')).toBe('3782 822463 10008');
      expect(mountWrapper.state('icon')).toBe(faTimesCircle);

    });

    test('input number that is Master card', () => {
      const inputValue = '51051051051';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('5105 1051 0510 0000');
      expect(mountWrapper.state('shownValue')).toBe('5105 1051 051');
      expect(mountWrapper.state('icon')).toBe(faCcMastercard);

      const inputValue2 = '5105105105105100';
      inputBox.simulate('change', { target: { value: inputValue2 } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('5105 1051 0510 5100');
      expect(mountWrapper.state('shownValue')).toBe('5105 1051 0510 5100');
      expect(mountWrapper.state('icon')).toBe(faCcMastercard);

      const inputValue3 = '5105105105105108';
      inputBox.simulate('change', { target: { value: inputValue3 } });
      expect(mountWrapper.state('valid')).toBe('invalid');
      expect(mountWrapper.state('placeholder')).toBe('5105 1051 0510 5108');
      expect(mountWrapper.state('shownValue')).toBe('5105 1051 0510 5108');
      expect(mountWrapper.state('icon')).toBe(faTimesCircle);

    });

    test('input number that is Discover card', () => {
      const inputValue = '60111111111';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1110 0000');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 111');
      expect(mountWrapper.state('icon')).toBe(faCcDiscover);

      const inputValue2 = '6011111111111117';
      inputBox.simulate('change', { target: { value: inputValue2 } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('icon')).toBe(faCcDiscover);

      const inputValue3 = '6011111111111112';
      inputBox.simulate('change', { target: { value: inputValue3 } });
      expect(mountWrapper.state('valid')).toBe('invalid');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1111 1112');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 1111 1112');
      expect(mountWrapper.state('icon')).toBe(faTimesCircle);

    });

    test('delete the number in the input box', () => {
      inputBox.simulate('change', { target: { value: '' } });
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('Number on your credit card');
      expect(mountWrapper.state('shownValue')).toBe('');
      expect(mountWrapper.state('icon')).toBe(null);
    });

    test('input more the the required number of digits', () => {
      const inputValue = '6011111111111117';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('icon')).toBe(faCcDiscover);

      const inputValue2 = '60111111111111178';
      inputBox.simulate('change', { target: { value: inputValue2 } });
      expect(mountWrapper.state('valid')).toBe('valid');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 1111 1117');
      expect(mountWrapper.state('icon')).toBe(faCcDiscover);
    });

    test('click on reset button', () => {
      const inputValue = '6011111111111112';
      inputBox.simulate('change', { target: { value: inputValue } });
      expect(mountWrapper.state('valid')).toBe('invalid');
      expect(mountWrapper.state('placeholder')).toBe('6011 1111 1111 1112');
      expect(mountWrapper.state('shownValue')).toBe('6011 1111 1111 1112');
      expect(mountWrapper.state('icon')).toBe(faTimesCircle);

      const resetButton = mountWrapper.find(FontAwesomeIcon);
      resetButton.simulate('click');
      expect(mountWrapper.state('valid')).toBe('matching');
      expect(mountWrapper.state('placeholder')).toBe('Number on your credit card');
      expect(mountWrapper.state('shownValue')).toBe('');
      expect(mountWrapper.state('icon')).toBe(null);
    })
  });

});
