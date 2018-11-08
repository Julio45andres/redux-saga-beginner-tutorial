import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { helloSaga, logger } from "./sagas";

import Counter from "./Counter";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

// const logger = store => next => action => {
//   console.group(action.type);
//   console.log("previus state", store.getState());
//   console.info("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   console.groupEnd();
//   return result;
// };

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(helloSaga);
sagaMiddleware.run(logger);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
