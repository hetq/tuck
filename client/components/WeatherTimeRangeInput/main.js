import * as R from 'ramda'
import * as D from 'date-fns'

const toISO = date => D.formatISO(date, { representation: 'date' })
const fromISO = D.parseISO

const props = {
  value: Object,
  scope: Object
}

const data = () => ({
  isActive: false,
  tmpInterval: null
})

const computed = {
  isoPair: {
    get () {
      // operate on `tmpInterval`
      // exists only until completed
      if (this.tmpInterval) {
        return this.tmpInterval
      }

      // fallback to outside prop
      const { start, end } = this.value
      return [start, end].map(toISO)
    },
    set (pair) {
      // don't init update
      // unless both ends of the range supplied
      return pair.length < 2
        ? this.stash(pair)
        : this.update(pair)
    }
  },
  isoMin () {
    return this.scope
      .map(R.prop('min'))
      .map(toISO)
      .getOrElse(undefined)
  },
  isoMax () {
    return this.scope
      .map(R.prop('max'))
      .map(toISO)
      .getOrElse(undefined)
  },
  inputValue () {
    return this.isoPair.join(' ~ ')
  }
}

const methods = {
  stash (interval) {
    this.tmpInterval = interval
  },
  update (interval) {
    this.isActive = false

    this.stash(undefined)

    const [a, b] = interval.map(fromISO)

    const start = D.startOfDay(a)
    const end = D.endOfDay(b)

    this.$emit('input', { start, end })
  }
}

export default {
  name: 'WeatherTimeRangeInput',
  props,
  data,
  computed,
  methods
}
