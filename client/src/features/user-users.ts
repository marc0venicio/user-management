import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  id: number;
  username: string;
  password: string;
  active: boolean;
  createdate: string;
  updateddate: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const fetchUser = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get('http://localhost:3000/api_v1/user/users', {
      withCredentials: true,
    });

    if (response.status >= 200) {
      return response.data.data;
    }

    return [];
  }
)
const createUser = createAsyncThunk(
  'users/createUser',
  async (createdUser: User) => {
    const response = await axios.post('http://localhost:3000/api_v1/user/user', createdUser, {
      withCredentials: true,
    });

    if (response.status >= 200) {
      return createdUser;
    }

    throw new Error('Failed to create user.');
  }
)

const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser: User) => {
    const response = await axios.put(`http://localhost:3000/api_v1/user/user/${updatedUser.id}`, updatedUser, {
      withCredentials: true,
    });

    if (response.status >= 200) {
      return updatedUser;
    }

    throw new Error('Failed to update user.');
  }
)

const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    const response = await axios.delete(`http://localhost:3000/api_v1/user/user/${userId}`, {
      withCredentials: true,
    });

    if (response.status >= 200) {
      return userId;
    }

    throw new Error('Failed to delete user.');
  }
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    });
  },
  selectors: {
    users: (state: UserState) => state.users,
  },
});

export const userReducer = userSlice.reducer;
export {
  fetchUser,
  updateUser,
  deleteUser,
  createUser
};
