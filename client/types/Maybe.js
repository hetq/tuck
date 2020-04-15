import { taggedSum } from 'daggy'

import * as R from 'ramda'

const Maybe = taggedSum('Maybe', {
  Nothing: [],
  Just: ['value']
})

const { Nothing, Just } = Maybe

//

Maybe.of = Just

Maybe.empty = () => Nothing

Maybe.fromOptional =
  R.ifElse(
    R.isNil,
    Maybe.empty,
    Maybe.of
  )

//

Maybe.prototype.map = function (f) {
  return this.cata({
    Nothing: () => Nothing,
    Just: x => Just(f(x))
  })
}

Maybe.prototype.reduce = function (f, y) {
  return this.cata({
    Nothing: () => y,
    Just: x => f(y, x)
  })
}

//

export default Maybe
