import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagasMiddleware from "redux-saga";
import { reducer } from "./reducer";
import { sagas } from "./sagas";

const sagasMiddleware = createSagasMiddleware();

const loggerMiddleware = createLogger({
  collapsed: () => true,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagasMiddleware, loggerMiddleware))
);

sagasMiddleware.run(sagas);

export { store };
