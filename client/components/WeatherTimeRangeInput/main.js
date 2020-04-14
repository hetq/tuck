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
      if (this.tmpInterval) {
        return this.tmpInterval
      }

      const { start, end } = this.value
      return [start, end].map(toISO)
    },
    set (pair) {
      if (pair.length < 2) {
        this.tmpInterval = pair
      } else {
        this.update(pair)
      }
    }
  },
  isoMin () {
    const min = this.scope
      .map(R.prop('min'))
      .map(toISO)

    return min.isSuccess()
      ? min.value
      : undefined
  },
  isoMax () {
    const max = this.scope
      .map(R.prop('max'))
      .map(toISO)

    return max.isSuccess()
      ? max.value
      : undefined
  },
  inputValue () {
    return this.isoPair.join(' ~ ')
  }
}

const methods = {
  update (pair) {
    this.isActive = false
    this.tmpInterval = null

    const [a, b] = pair.map(fromISO)

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
