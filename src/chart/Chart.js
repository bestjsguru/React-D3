import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axis from './Axis';
import Grid from './Grid';
import Selectors from './Selectors';

import {
  toggleTemperature,
  togglePressure,
  toggleVibration,
  toggleCurrent,
  toggleUltrasound,
} from './toggle.actions';

class Chart extends Component {
    static propTypes = {
      temperatureOn: PropTypes.bool.isRequired,
      pressureOn: PropTypes.bool.isRequired,
      vibrationOn: PropTypes.bool.isRequired,
      currentOn: PropTypes.bool.isRequired,
      ultrasoundOn: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {
        width: window.innerWidth,
        height: 300,
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.onResizeHandler.bind(this));
    }

    onResizeHandler() {
      this.setState({ width: window.innerWidth });
    }

    render() {
      const { width, height } = this.state;

      const {
        temperatureOn,
        pressureOn,
        vibrationOn,
        currentOn,
        ultrasoundOn,
      } = this.props;

      const {
        temperature,
        pressure,
        vibration,
        current,
        ultrasound,
      } = this.props.data;

      const datum = [temperature, pressure, vibration, current, ultrasound];
      const visiblities = [temperatureOn, pressureOn, vibrationOn, currentOn, ultrasoundOn];

      const margin = {
        top: 5,
        right: width * 0.1,
        bottom: 20,
        left: width * 0.1,
      };

      const w = width - (margin.left + margin.right);
      const h = height - (margin.top + margin.bottom);
      const parseDate = d3.time.format('%m-%d-%Y').parse;

      datum.forEach((data) => {
        data.forEach((d) => { d.date = parseDate(d.day); });
      });

      const xScale = d3.time.scale()
        .domain(d3.extent(temperature, d => d.date))
        .range([0, w]);

      const xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickValues(temperature.map(d => d.date).splice(1))
        .tickFormat(d3.time.format('%d'))
        .ticks(4);

      const yScale = d3.scale.linear()
        .domain([0, d3.max(temperature, d => d.value + 1)])
        .range([h, 0]);

      const yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(5);

      const yGrid = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(5)
        .tickSize(-w, 0, 0)
        .tickFormat('');

      const line = d3.svg.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
        .interpolate('cardinal');

      const colors = ['#b7c95b', '#fce300', '#2c97de', '#ffab27', '#bbbbbb'];
      const transform = `translate(${margin.left}, ${margin.top})`;
      const lines = datum.map((data, id) => (<path stroke={visiblities[id] ? colors[id] : 'transparent'} className="line" d={line(data)} strokeWidth="1" />));

      return (
        <div>
          <Selectors colors={colors} />
          <br />
          <svg width="100%" height={height} >
            <g transform={transform}>
              <Grid h={h} grid={yGrid} gridType="y" />
              <Axis h={h} axis={yAxis} axisType="y" />
              <Axis h={h} axis={xAxis} axisType="x" />
              {lines}
            </g>
          </svg>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
