import { all, put, fork, select, throttle } from 'redux-saga/effects'
import { RATINGS, BEST_RATING } from './transactions'
import { getRatings } from './store'

function* ratingsWorker() {
  const ratings = yield select(getRatings)

  const best = Object.keys(ratings).reduce((result, account) => {
    const bestRating = ratings[account].reduce((result, rating) => {
      return result.rating > rating.rating ? result : rating
    }, {})
    return result.rating > bestRating.rating ? result : bestRating
  }, {})

  yield put({
    type: BEST_RATING,
    payload: { rating: best }
  })
}

function* ratingsWatcher() {
  yield throttle(1000, RATINGS, ratingsWorker)
}

export function* ratingsRootSaga() {
  yield all([fork(ratingsWatcher)])
}
