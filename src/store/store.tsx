import { combineReducers, configureStore, createAction } from "@reduxjs/toolkit";
import  clientReducer from "./clientSlice";
import  usersReducer from "./usersSlice";

export const resetStore = createAction('RESET_STORE');

const appReducer = combineReducers({
  clientData: clientReducer,
  users: usersReducer,

});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;