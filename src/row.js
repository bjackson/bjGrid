/**
 * Created by brett on 6/12/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import NumberField from './NumberField';
import Cell from './Cell';


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


class Row extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.string,
      style: React.PropTypes.object,
      data: React.PropTypes.object,
      columnOptions: React.PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      classNames: null,
    };
  }

  componentDidMount() {
    this.addAnimation();
  }

  componentDidUpdate(prevProps) {
    const el = ReactDOM.findDOMNode(this);
    el.classList.remove('demo');
    if (!_.isEqual(prevProps, this.props)) {
      this.addAnimation();
    }
  }

  addAnimation() {
    const el = ReactDOM.findDOMNode(this);
    el.classList.remove('demo');
    el.classList.add('demo');
  }

  render() {
    const columns = _.keys(this.props.data).map(col => {
      let toDisplay;
      if (isNumeric(this.props.data[col])) {
        toDisplay = (<NumberField redOrGreen={ this.props.columnOptions[col].redOrGreen }>
          { this.props.data[col] }
          </NumberField>);
      } else {
        toDisplay = this.props.data[col];
      }
      return (
        <Cell key={ col } style={ this.props.style }>
          { toDisplay }
        </Cell>
      );
    });

    return (
      <tr style={ this.props.style }>
        { columns }
      </tr>
    );
  }
}

export default Row;
