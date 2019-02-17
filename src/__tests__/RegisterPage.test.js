import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../app/store';

import { RegisterPage } from '../onboarding/RegisterPage';
import { OnboardingHeader } from '../_common/components';

describe('-------------COMPONENT TESTING - RegisterPage ------------- ', () => {
  const wrapper = shallow(<RegisterPage />);

  it('+++ RegisterPage Dumb Component Rendering', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ RegisterPage Contains OnboardingHeader Component', () => {
    expect(wrapper.contains(<OnboardingHeader />)).toBe(true);
  });
});
