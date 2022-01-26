import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { forbiddenWordsMiddleware } from "./middleWare";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, forbiddenWordsMiddleware))
);

export const persistor = persistStore(store);
