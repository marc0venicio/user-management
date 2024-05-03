import { configureStore } from '@reduxjs/toolkit';
import userAuthenticationReducer from '../features/user-authentication';
import { userReducer } from '../features/user-users';

export const store = configureStore({
  reducer: {
    userAuthentication: userAuthenticationReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;