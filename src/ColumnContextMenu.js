/**
 * Created by brett on 6/19/16.
 */
import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
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
      addColumn: React.PropTypes.func.isRequired,
      hiddenColumns: React.PropTypes.arrayOf(React.PropTypes.string),
    };
  }

  getAddColumnItems() {
    return this.props.hiddenColumns.map(col => {
      return (
        <MenuItem
          key={ col }
        >
          { col }
        </MenuItem>
      );
    });
  }

  getMenuItemEnums() {
    return [
      {
        optionId: 'removeColumn',
        text: 'Remove column',
      },
      {
        optionId: 'addColumn',
        text: 'Add column',
        isSubMenu: true,
        subMenuItems: this.getAddColumnItems(),
      },
      {
        optionId: 'groupBy',
        text: 'Group by column',
      },
    ];
  }

  onOptionClick(opts) {
    console.log(opts);
    if (opts.key === 'removeColumn') {
      this.props.removeColumn();
    }
    if (opts.keyPath.length > 1) {
      if (opts.keyPath.slice(-1)[0] === 'addColumn') {
        this.props.addColumn(opts.key);
      }
    }
  }

  getMenuItems() {
    const menuItems = this.getMenuItemEnums();

    return menuItems.map(item => {
      if (item.isSubMenu) {
        return (
          <SubMenu
            title={ item.text }
            key={ item.optionId }
          >
            { this.getAddColumnItems() }
          </SubMenu>
        );
      }

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
