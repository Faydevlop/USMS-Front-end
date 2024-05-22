import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

// api parts here
// admin login
export const adminLogin = createAsyncThunk(
    'admin/login',
    async(adminData,{ rejectWithValue })=>{
        try {
            let response = await axios.post('http://localhost:8000/admin/login',adminData);
            return response.data
        } catch (error) {
            // Check if the error has a response from the server
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: error.message });
        }
            
        }
    }
)

export const adminLogout = createAsyncThunk(
    'admin/logout',
    async()=>{
        const response = await axios.post('http://localhost:8000/admin/logout')
        return response.data
    }
)

// delete user








// slice part here 
const AdminSlice = createSlice({
    name:'admin',
    initialState:{
        user:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.payload ? action.payload.message : "Registration failed";
        })
        .addCase(adminLogout.pending,(state)=>{
            state.loading = true;
        })
        .addCase(adminLogout.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = null;
        })
        

    }

})

export const adminReducer = AdminSlice.reducer