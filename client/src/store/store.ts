import { configureStore } from '@reduxjs/toolkit';
import userAuthenticationReducer from '../features/user-authentication';
import { userInvoicesReducer } from '../features/user-invoices';

export const store = configureStore({
  reducer: {
    userAuthentication: userAuthenticationReducer,
    userInvoices: userInvoicesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;