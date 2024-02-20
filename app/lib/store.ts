import { combineReducers, createStore } from "@reduxjs/toolkit";
import currencyReducer from "./features/currency";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import portfolioReducer from "./features/portfolio";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  currency: currencyReducer,
  portfolio: portfolioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
