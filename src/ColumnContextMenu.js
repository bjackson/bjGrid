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
  // position: 'absolute',
  backgroundColor: '#fff',
  border: 'solid 1px #dfdfdf',
  width: '150px',
};

const menuStyles = {
  listStyle: 'none',
  padding: 0,
  boxSizing: 'border-box',
};

const itemStyles = {
  borderBottom: 'solid 1px #ccc',
  padding: 10,
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

  getMenuItems() {
    const menuItems = [
      {
        text: 'Remove column',
      },
      {
        text: 'Add column',
      },
      {
        text: 'Group by column',
      },
    ];

    return menuItems.map(item => {
      return (
        <MenuItem
          key={ item.text }
          style={ itemStyles }
        >
          { item.text }
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <container
        style={ containerStyles }
        className="columnContextMenu"
        onMouseLeave={ () => this.onMouseLeave() }
      >
        <Menu menuStyles={ menuStyles }>
          { this.getMenuItems() }
        </Menu>
      </container>
    );
  }
}
