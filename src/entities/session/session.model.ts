import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Session } from "./types";
const initialState = {
  user: {
    username: "",
  },
  authenticated: false,
  error: null as null | string,
};
type State = typeof initialState;
const name = "entities/session";
const sessionSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, creds: PayloadAction<Session>) {
      state.user.username = creds.payload.username;
      state.authenticated = true;
    },
    removeUser(state) {
      state.user.username = "";
      state.authenticated = false;
    },
    setError(state, error: PayloadAction<string>) {
      state.error = error.payload;
    },
  },
});

const user = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].user,
);
const error = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].error,
);
const authenticated = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].authenticated,
);

export const selectors = {
  user,
  error,
  authenticated,
};

export const actions = {
  setUser: sessionSlice.actions.setUser,
  removeUser: sessionSlice.actions.removeUser,
  setError: sessionSlice.actions.setError,
};

export const reducer = { [sessionSlice.name]: sessionSlice.reducer };