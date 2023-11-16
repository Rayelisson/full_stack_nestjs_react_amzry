import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Jwt } from './models/Jwt';
import { NewUser } from "./models/NewUser";
import authService from "./services/auth.service";
import { DisplayUser } from "./models/DisplayUser.interface";
import { RootState } from "../../store";

const storedUser: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null;

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }

interface AuthState extends AsyncState {
    isLoading: boolean
    isSuccess: boolean
    isError: boolean

}


interface AuthState extends AsyncState {
   user?: DisplayUser | null;
   jwt?: Jwt
   isAuthenticated?: boolean
   
}

const initialState: AuthState = {
    user: user,
    jwt: jwt,
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

  export const register = createAsyncThunk(
    'auth/register',
    async (user: NewUser, thunkAPI) => {
      try {
        return await authService.register(user)
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to register!');
      }
    }
  );


export const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
          },
    },

       extraReducers: (builder) => {
        builder
         .addCase(register.pending, (state) => {
            state.isLoading = true
        })

        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user  = action.payload ;
          })

          .addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null;
          })
       },
})

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};


export default authSlice.reducer;