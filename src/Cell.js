/**
 * Created by brett on 6/22/16.
 */

import React from 'react';

export default class Cell extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.node,
    };
  }
  render() {
    return (
      <td style={ this.style }>
        { this.props.children }
      </td>
    );
  }
}