import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";

import rootReducer from "./src/modules/index";
import autoRefreshToken from "./src/middleware/autoRefreshToken";

//import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const enhancers = [];
const middleware = [autoRefreshToken, apiMiddleware, thunk];

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  whitelist: ["auth"]
};

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  composedEnhancers
);

export const persistor = persistStore(store);
export default store;
