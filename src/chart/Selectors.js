import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleTemperature,
  togglePressure,
  toggleVibration,
  toggleCurrent,
  toggleUltrasound,
} from './toggle.actions';

class Selectors extends Component {
    static propTypes = {
      toggleTemperature: PropTypes.func.isRequired,
      togglePressure: PropTypes.func.isRequired,
      toggleVibration: PropTypes.func.isRequired,
      toggleCurrent: PropTypes.func.isRequired,
      toggleUltrasound: PropTypes.func.isRequired,
      temperatureOn: PropTypes.bool.isRequired,
      pressureOn: PropTypes.bool.isRequired,
      vibrationOn: PropTypes.bool.isRequired,
      currentOn: PropTypes.bool.isRequired,
      ultrasoundOn: PropTypes.bool.isRequired,
      colors: PropTypes.array.isRequired,
    }

    render() {
      const { colors } = this.props;

      const {
        temperatureOn,
        pressureOn,
        vibrationOn,
        currentOn,
        ultrasoundOn,
      } = this.props;

      return (
        <div className="row selector-container">
          <a onClick={this.props.toggleTemperature} className={temperatureOn ? 'active' : ''}><span style={{ 'background-color': colors[0] }} />Temperature</a>
          <a onClick={this.props.togglePressure} className={pressureOn ? 'active' : ''}><span style={{ 'background-color': colors[1] }} />Pressure</a>
          <a onClick={this.props.toggleVibration} className={vibrationOn ? 'active' : ''}><span style={{ 'background-color': colors[2] }} />Vibration</a>
          <a onClick={this.props.toggleCurrent} className={currentOn ? 'active' : ''}><span style={{ 'background-color': colors[3] }} />current</a>
          <a onClick={this.props.toggleUltrasound} className={ultrasoundOn ? 'active' : ''}><span style={{ 'background-color': colors[4] }} />Ultrasound</a>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    temperatureOn: state.toggle.temperature,
    pressureOn: state.toggle.pressure,
    vibrationOn: state.toggle.vibration,
    currentOn: state.toggle.current,
    ultrasoundOn: state.toggle.ultrasound,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleTemperature,
    togglePressure,
    toggleVibration,
    toggleCurrent,
    toggleUltrasound,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
