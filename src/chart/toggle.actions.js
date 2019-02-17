export const TOGGLE_TEMPERATURE = 'temperature';
export const TOGGLE_PRESSURE = 'pressure';
export const TOGGLE_VIBRATION = 'vibration';
export const TOGGLE_CURRENT = 'current';
export const TOGGLE_ULTRASOUND = 'ultrasound';

export function toggleTemperature() {
  return {
    type: TOGGLE_TEMPERATURE,
  };
}

export function togglePressure() {
  return {
    type: TOGGLE_PRESSURE,
  };
}

export function toggleVibration() {
  return {
    type: TOGGLE_VIBRATION,
  };
}

export function toggleCurrent() {
  return {
    type: TOGGLE_CURRENT,
  };
}

export function toggleUltrasound() {
  return {
    type: TOGGLE_ULTRASOUND,
  };
}
