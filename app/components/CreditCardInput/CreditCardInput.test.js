// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import CreditCardInput from './CreditCardInput';

describe('CreditCardInput: ', () => {
  const mountWrapper = mount(<CreditCardInput/>);

  test('first test', () => {
    expect(true).toBe(true);
  });

  test('card validator', () => {
    const validator = mountWrapper.instance().cardValidation;

    expect(validator('4546843849684')).toBe(false);
    expect(validator('4012888888881881')).toBe(true);
    expect(validator('378282246310005')).toBe(true);

  })
});
