import * as D from 'date-fns'

const toISO = date => D.formatISO(date, { representation: 'date' })
const fromISO = D.parseISO

const props = {
  value: Object,
  min: {
    type: Date,
    default: D.startOfToday
  },
  max: {
    type: Date,
    default: () => D.addDays(D.startOfToday(), 5)
  }
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
    return toISO(this.min)
  },
  isoMax () {
    return toISO(this.max)
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
