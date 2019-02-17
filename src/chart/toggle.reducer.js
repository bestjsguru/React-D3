import {
  TOGGLE_TEMPERATURE,
  TOGGLE_PRESSURE,
  TOGGLE_VIBRATION,
  TOGGLE_CURRENT,
  TOGGLE_ULTRASOUND,
} from './toggle.actions';

const INITIAL_STATE = {
  temperature: true,
  pressure: true,
  vibration: true,
  current: true,
  ultrasound: true,
};

export function toggle(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_TEMPERATURE:
      return { ...state, temperature: !state.temperature };
    case TOGGLE_PRESSURE:
      return { ...state, pressure: !state.pressure };
    case TOGGLE_VIBRATION:
      return { ...state, vibration: !state.vibration };
    case TOGGLE_CURRENT:
      return { ...state, current: !state.current };
    case TOGGLE_ULTRASOUND:
      return { ...state, ultrasound: !state.ultrasound };
    default:
      return state;
  }
}
