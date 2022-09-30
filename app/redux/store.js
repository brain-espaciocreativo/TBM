import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import users from './slices/userSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: users,
    }
});