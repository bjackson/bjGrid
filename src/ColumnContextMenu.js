/**
 * Created by brett on 6/19/16.
 */
import React from 'react';
import Menu, { MenuItem } from 'rc-menu';
import './columnContextMenu.scss';

const containerStyles = {
  justifyContent: 'space-between',
  margin: '0 auto',
  padding: '0 24px',
  maxWidth: '960px',
  position: 'absolute',
  backgroundColor: '#fff',
  border: 'solid 1px #dfdfdf',
  width: '150px',
};

const menuStyles = {
  listStyle: 'none',
  padding: '0',
  boxSizing: 'border-box',
};

export default class ColumnContextMenu extends React.Component {
  static propTypes() {
    return {
      mouseLeft: React.PropTypes.func.isRequired,
      colName: React.PropTypes.string.isRequired,
    };
  }
  onMouseLeave() {
    // noinspection JSUnresolvedFunction
    this.props.mouseLeft();
  }

  render() {
    return (
      <container
        style={ containerStyles }
        className="columnContextMenu"
        onMouseLeave={ () => this.onMouseLeave() }
      >
        <Menu menuStyles={ menuStyles }>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </Menu>
      </container>
    );
  }
}
