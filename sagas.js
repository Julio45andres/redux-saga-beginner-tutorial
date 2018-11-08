import { select, takeEvery } from "redux-saga/effects";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* logger() {
  let oldState = 0;
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
    console.group(action.type);
    console.log("previus state", oldState);
    console.info("dispatching", action);
    console.log("next state", state);
    console.groupEnd();
    oldState = state;
  });
}
