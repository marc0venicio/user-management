import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Invoice = {
    id: number;
    date: string;
    payee: string;
    description: string;
    due_date: string;
    amount: number;
    paid: boolean | string;
    created_at: string;
    [key: string]: string | number | boolean;
}

interface UserInvoicesState {
    invoices: Invoice[];
}

const initialState: UserInvoicesState = {
    invoices: [],
};

const fetchUserInvoices = createAsyncThunk(
    'userInvoices/fetchUserInvoices',
    async () => {
        const response = await axios.get('http://localhost:3000/api/invoices', {
            withCredentials: true,
        });

        if (response.status >= 200) {
            return response.data;
        }

        return [];
    }
)

const userInvoicesSlice = createSlice({
    name: "userInvoices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserInvoices.fulfilled, (state, action) => {
            state.invoices = action.payload;
        });
    },
    selectors: {
        invoices: (state: UserInvoicesState) => state.invoices,
    },
});

export const userInvoicesReducer = userInvoicesSlice.reducer;
export {
    fetchUserInvoices
};
