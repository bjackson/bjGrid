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
      colName: React.PropTypes.string.isRequired,
      removeColumn: React.PropTypes.func.isRequired,
    };
  }

  static getMenuItemEnums() {
    return [
      {
        optionId: 'removeColumn',
        text: 'Remove column',
      },
      {
        optionId: 'addColumn',
        text: 'Add column',
      },
      {
        optionId: 'groupBy',
        text: 'Group by column',
      },
    ];
  }

  onOptionClick(opts) {
    if (opts.key === 'removeColumn') {
      this.props.removeColumn();
    }
  }

  getMenuItems() {
    const menuItems = ColumnContextMenu.getMenuItemEnums();

    return menuItems.map(item => {
      return (
        <MenuItem
          key={ item.optionId }
          style={ itemStyles }
        >
          { item.text }
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <Menu
        style={ { ...menuStyles, ...containerStyles } }
        className="columnContextMenu"
        onClick={ this.onOptionClick.bind(this) }
      >
        { this.getMenuItems() }
      </Menu>
    );
  }
}
