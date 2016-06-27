import React from 'react';
import _ from 'lodash';
import Row from './row';
import ColumnContextMenu from './ColumnContextMenu';
import { Icon } from 'react-fa';
import '../node_modules/font-awesome/css/font-awesome.css';
import './grid.scss';

const gridStyles = {

};

const sortIconStyles = {
  padding: '5px',
};

const Grid = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    style: React.PropTypes.object,
    dataSource: React.PropTypes.array,
    options: React.PropTypes.object,
    rowKey: React.PropTypes.string,
  },

  getInitialState() {
    return {
      sortBy: 'symbol',
      direction: 'asc',
      showMenuFor: null,
      hiddenColumns: [],
    };
  },

  getMenuIfToBeShown(colName) {
    if (this.state.showMenuFor === colName) {
      return (<ColumnContextMenu
        colName={ colName }
        removeColumn={ () => this.removeColumn(colName) }
      />);
    }

    return null;
  },

  toggleMenu(colName) {
    if (this.state.showMenuFor !== colName) {
      this.setState({
        showMenuFor: colName,
      });
    } else {
      this.setState({
        showMenuFor: null,
      });
    }
  },

  colSortClicked(colName) {
    if (colName === this.state.sortBy) {
      this.sortByColumn(colName, this.state.direction === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortByColumn(colName, 'asc');
    }
  },

  isSortedColumn(colName) {
    return colName === this.state.sortBy;
  },

  sortByColumn(colName, direction = 'asc') {
    this.setState({
      sortBy: colName,
      direction,
    });
  },

  closeMenu() {
    this.setState({
      showMenuFor: null,
    });
  },

  removeColumn(colName) {
    console.log(`removing col: ${colName}`);
    this.setState({
      hiddenColumns: this.state.hiddenColumns.concat(colName),
    });
  },

  getHeaders() {
    return _.keys(this.props.dataSource[0]).map(colName => {
      if (this.state.hiddenColumns.includes(colName)) {
        return null;
      }

      let sortIcon;

      if (this.isSortedColumn(colName)) {
        if (this.state.direction === 'asc') {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      } else {
        sortIcon = 'sort';
      }

      const columnTitle = this.props.options.columnOptions[colName]
        ? this.props.options.columnOptions[colName].name
        : colName;

      return (
        <th key={ `header-${colName}` }>
            { columnTitle }
              <Icon name={ sortIcon }
                style={ sortIconStyles }
                onClick={ () => this.colSortClicked(colName) }
              />
              <Icon
                name="bars"
                style={ sortIconStyles }
                onClick={ () => this.toggleMenu(colName) }
              />
            { this.getMenuIfToBeShown(colName) }
        </th>);
    });
  },

  render() {
    const body = this.props.dataSource
      .sort((a, b) => {
        let aa = a;
        let bb = b;
        if (this.state.direction === 'desc') {
          const temp = aa;
          aa = bb;
          bb = temp;
        }

        const sortBy = this.state.sortBy;
        if (sortBy === null) {
          return 0;
        }

        if (aa[sortBy] < bb[sortBy]) {
          return -1;
        }
        if (aa[sortBy] > bb[sortBy]) {
          return 1;
        }
        return 0;
      })
      .map(item => {
        return (
          <Row
            key={ item[this.props.rowKey] }
            data={ item }
            hiddenColumns={ this.state.hiddenColumns }
            columnOptions={ this.props.options.columnOptions }
          />
        );
      });

    return (
      <div className="container container-fluid">
        <table
          className="table table-hover"
          style={{ ...gridStyles, ...this.props.style }}
        >
          <thead>
          <tr>
            { this.getHeaders() }
          </tr>
          </thead>
          <tbody>
          { body }
          </tbody>

          { this.props.children }
        </table>
      </div>
    );
  },
});

export default Grid;
