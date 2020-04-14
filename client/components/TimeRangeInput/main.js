import * as R from 'ramda'

import {
  timeToDateISO,
  rangeToPairISO,
  rangeFromPairISO
} from './helpers'

//

const props = {
  value: Object,
  scope: Object
}

const data = () => ({
  isActive: false,
  tmpInput: null
})

const computed = {
  isoPair: {
    get () {
      // operate on temporary input until completed if exists
      return this.tmpInput ||
        // fallback to passed prop
        rangeToPairISO(this.value)
    },
    set (input) {
      // don't init update
      // unless both ends of the range supplied
      return input.length < 2
        ? this.stash(input)
        : this.update(input)
    }
  },
  isoMin () {
    return this.scope
      .map(R.prop('min'))
      .map(timeToDateISO)
      .getOrElse(undefined)
  },
  isoMax () {
    return this.scope
      .map(R.prop('max'))
      .map(timeToDateISO)
      .getOrElse(undefined)
  },
  inputValue () {
    return this.isoPair.join(' ~ ')
  }
}

const methods = {
  stash (input) {
    this.tmpInput = input
  },
  update (isoPair) {
    this.isActive = false

    this.stash(undefined)

    this.$emit('input', rangeFromPairISO(isoPair))
  }
}

export default {
  name: 'WeatherTimeRangeInput',
  props,
  data,
  computed,
  methods
}
