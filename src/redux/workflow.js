import { take, put } from 'redux-saga/effects'

import { GENERATE_TRANSACTIONS } from './transactions'

export function* congratulations() {
  for (let i = 0; i < 3; i++) {
    yield take(GENERATE_TRANSACTIONS)
  }
  yield put({ type: 'CONGRATULATIONS' })
}
