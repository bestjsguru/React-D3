import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Axis extends Component {
    static propTypes = {
      h: PropTypes.number.isRequired,
      axis: PropTypes.func.isRequired,
      axisType: PropTypes.oneOf(['x', 'y']).isRequired,
    }

    componentDidMount() { this.renderAxis(); }

    componentDidUpdate() { this.renderAxis(); }

    renderAxis() {
      const { axis } = this.props;
      const node = ReactDOM.findDOMNode(this);
      d3.select(node).call(axis);
    }

    render() {
      const { h, axisType } = this.props;
      const translate = `translate(0, ${h})`;
      return (
        <g className="axis" transform={axisType === 'x' ? translate : ''} />
      );
    }
}

export default Axis;
