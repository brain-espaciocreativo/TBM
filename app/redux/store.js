import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import users from './slices/userSlice';
import news from './slices/newSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: users,
        news: news
    }
});