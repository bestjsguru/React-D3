import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Grid extends Component {
    static propTypes = {
      h: PropTypes.number.isRequired,
      grid: PropTypes.func.isRequired,
      gridType: PropTypes.oneOf(['x', 'y']).isRequired,
    };

    componentDidMount() { this.renderGrid(); }

    componentDidUpdate() { this.renderGrid(); }

    renderGrid() {
      const { grid } = this.props;
      const node = ReactDOM.findDOMNode(this);
      d3.select(node).call(grid);
    }

    render() {
      const { h, gridType } = this.props;
      const translate = `translate(0, ${h})`;
      return (
        <g className="y-grid" transform={gridType === 'x' ? translate : ''} />
      );
    }
}

export default Grid;
