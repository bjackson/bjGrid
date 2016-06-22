/**
 * Created by brett on 6/12/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import NumberField from './NumberField';


const rowStyles = {
  padding: '5px',
  borderTop: '1px solid #ddd',
};

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

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);
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
        <td key={ col } style={ { ...rowStyles, ...this.props.style } }>
          { toDisplay }
        </td>
      );
    });

    return (
      <tr style={ { ...rowStyles, ...this.props.style } } >
        { columns }
      </tr>
    );
  }
}

export default Row;
