/**
 * Created by brett on 6/19/16.
 */
import React from 'react';

export default class NumberField extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.number,
      redOrGreen: React.PropTypes.bool,
    };
  }

  render() {
    let numberFieldStyle = {};

    if(this.props.redOrGreen) {
      if (this.props.children < 0) {
        numberFieldStyle.color = 'red';
      } else if (this.props.children > 0) {
        numberFieldStyle.color = 'green';
      }
    }

    return (
      <span style={ numberFieldStyle }>
        { parseFloat(Math.round(this.props.children * 100) / 100).toFixed(2) }
      </span>
    );
  }
}
