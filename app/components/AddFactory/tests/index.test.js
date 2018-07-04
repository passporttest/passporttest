import React from 'react';
import { shallow } from 'enzyme';

import AddFactory from '../index';

const onSubmit = () => {};

describe('<AddFactory />', () => {
  const renderedComponent = shallow(<AddFactory onSubmit={onSubmit} />);
  expect(renderedComponent.find('div').node).toBeDefined();
});
