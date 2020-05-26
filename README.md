# run-daily

Run some functions at specific times each day.
Poor mans cron in JS.

```
npm install run-daily
```

## Usage

``` js
const runDaily = require('run-daily')

runDaily([ // specify some intervals (is utc)
  '15:30',
  '19:00',
  '00:00'
], function (i) {
  console.log('Time is:' + ['15:30', '19:00', '00:00'][i])
})
```

## API

#### `destroy = runDaily(times, fn)`

Run a function at a specific time each day.

## License

MIT
