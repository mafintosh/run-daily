const DAY = 3600 * 24 * 1000

module.exports = runDaily

function runDaily (times, run) {
  times = [].concat(times).map(parse)

  const now = Date.now() % DAY
  let target = 0
  let timeout = null

  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const next = i + 1 < times.length ? times[i + 1] : DAY
    if (now > time && now < next) {
      target = (i + 1) % times.length
      break
    }
  }

  const delta = ((times[target] + DAY) - now) % DAY

  timeout = setTimeout(loop, delta)
  return () => clearTimeout(timeout)

  function loop () {
    run(target, times)
    target = (target + 1) % times.length
    const delta = ((times[target] + DAY) - (Date.now() % DAY)) % DAY
    timeout = setTimeout(loop, delta)
  }
}

function parseArray (time) {
  time = time.concat(0, 0, 0).slice(0, 3)
  return time[0] * 3600000 + time[1] * 60000 + time[2] * 1000
}

function parse (time) {
  if (Array.isArray(time)) return parseArray(time)
  if (typeof time === 'number') return time
  return parseArray(time.split(':').map(n => Number(n)))
}
