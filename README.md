# bjGrid

A grid focused on realtime updates with sorting and grouping.

See `src/stories/index.js` for an example of how to use the grid.

A basic example is below:

```
this.state.options = {
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

<Grid
    dataSource={ this.state.dataSource }
    options={ this.state.options }
    rowKey="symbol"
/>
```

`this.state.dataSource` would be composed like the following:
```
this.state.dataSource = [
    {
        symbol: 'AAPL',
        lastPrice: 29.35,
        bid: 29.32,
        ask: 29.37,
        volume: 26002345,
        assetType: 'Equity',
        change: -0.02,
    },
    {
        symbol: 'IBM',
        lastPrice: 34.35,
        bid: 34.32,
        ask: 34.37,
        volume: 6323441,
        assetType: 'Equity',
        change: -0.05,
    },
    {
        symbol: 'T',
        lastPrice: 40.04,
        bid: 40.03,
        ask: 40.07,
        volume: 8324982,
        assetType: 'Equity',
        change: -0.04,
    },
];
```