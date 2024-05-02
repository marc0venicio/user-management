import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserAuthenticationState {
  isAuthenticated: boolean;
}

const initialState: UserAuthenticationState = {
    isAuthenticated: false,
};

const checkUserIsAuthenticated = createAsyncThunk(
  'userAuthentication/checkUserIsAuthenticated',
  async () => {
    const response = await axios.get('http://localhost:3000/api/auth/me', {
      withCredentials: true,
    });

    if (response.status >= 200) {
      return true;
    }

    return false;
  }
)

const authenticateUser = createAsyncThunk(
  'userAuthentication/authenticateUser',
  async (formData: { email: string, password: string }) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true
      }
    });

    if (response.status >= 200) {
      return true;
    }

    return false;
  }
);

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserIsAuthenticated.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });
  },
  selectors: {
    isAuthenticated: (state: UserAuthenticationState) => state.isAuthenticated,
  },
});

export { checkUserIsAuthenticated, authenticateUser };
export default userAuthenticationSlice.reducer;
