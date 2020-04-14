import * as R from 'ramda'
import * as D from 'date-fns/fp'

// date string from Datetime value
export const timeToDateISO = D.formatISOWithOptions({ representation: 'date' })

// date string to Datetime value
export const timeFromDateISO = D.parseISO

// { start, end } -> ['start', 'end']
export const rangeToPairISO = R.compose(
  R.map(timeToDateISO),
  R.props(['start', 'end'])
)

// ['start', 'end'] -> { start, end }
export const rangeFromPairISO = R.compose(
  R.applySpec({
    start: R.compose(D.startOfDay, D.min),
    end: R.compose(D.endOfDay, D.max)
  }),
  R.map(timeFromDateISO)
)
