import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Grid from '../Grid';
import _ from 'lodash';
import 'font-awesome-loader';

storiesOf('Grid', module)
  .add('default view', () => {
    const AppContainer = React.createClass({
      getInitialState() {
        return {
          options: {
            columnOptions: {
              symbol: {
                name: 'Symbol',
              },
              lastPrice: {
                name: 'Last Price',
              },
              bid: {
                name: 'Bid',
              },
              ask: {
                name: 'Ask',
              },
              volume: {
                name: 'Volume',
              },
              assetType: {
                name: 'Asset Type',
              },
              change: {
                name: 'Change',
                redOrGreen: true,
              },
            },
          },
          dataSource: [],
        };
      },

      componentDidMount() {
        this.ws = new WebSocket('ws://localhost:8080/');
        this.ws.onmessage = message => {
          this.onNewUpdate(JSON.parse(message.data));
        };
      },

      componentWillUnmount() {
        this.ws.close();
      },

      onNewUpdate(data) {
        let newData;
        const gridIndex = _(this.state.dataSource).findIndex(item => item.symbol === data.symbol);
        if (gridIndex < 0) {
          newData = this.state.dataSource.concat(data);
        } else {
          newData = this.state.dataSource.slice(0);
          newData[gridIndex] = data;
        }
        this.setState({ dataSource: newData });
      },

      ws: null,

      render() {
        return (
          <Grid
            dataSource={ this.state.dataSource }
            options={ this.state.options }
            rowKey="symbol"
          />
        );
      },
    });

    return (
      <AppContainer />
    );
  });
