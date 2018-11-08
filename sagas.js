import { put, all, select, takeEvery } from "redux-saga/effects";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* watchAndLog() {
  let previusState = 0;
  yield takeEvery(["*"], function* logger(action) {
    const nextState = yield select();
    console.group(action.type);
    console.info("dispatching", action);
    if (String(nextState) != String(previusState)) {
      console.log("previus state", previusState);
      console.log("next state", nextState);
    }
    console.groupEnd();
    previusState = nextState;
  });
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchAndLog()]);
}
