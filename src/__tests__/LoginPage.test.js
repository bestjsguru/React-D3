import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../app/store';

import { LoginPage } from '../onboarding/LoginPage';
import { OnboardingHeader } from '../_common/components';

describe('-------------COMPONENT TESTING - LoginPage ------------- ', () => {
  const wrapper = shallow(<LoginPage />);

  it('+++ LoginPage Dumb Component Rendering', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ LoginPage Contains OnboardingHeader Component', () => {
    expect(wrapper.contains(<OnboardingHeader />)).toBe(true);
  });
});
