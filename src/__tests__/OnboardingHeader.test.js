import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import store from '../app/store';
import { OnboardingHeader } from '../_common/components/OnboardingHeader';

describe('-------------COMPONENT TESTING - OnboardingHeader ------------- ', () => {
  it('+++ Onboarding Header Dumb Component Rendering', () => {
    const wrapper = shallow(<OnboardingHeader />);
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Onboarding Header Should contain image element', () => {
    const wrapper = shallow(<OnboardingHeader />);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('+++ Onboarding Header Should not contain server error rendering element in normal case', () => {
    const wrapper = shallow(<OnboardingHeader />);
    expect(wrapper.find('span').length).toEqual(0);
  });
});
