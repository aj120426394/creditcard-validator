import React from 'react';
import { shallow } from 'enzyme';
import Collapsible from '../../app/components/Collapsible/Collapsible';

test('Collapsible rneders correctly', () => {
  const component = shallow(<Collapsible title="testing"/>);
  expect(component).toMatchSnapshot();
});
