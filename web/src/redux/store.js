import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import users from './slices/userSlice';
import news from './slices/newSlice';
import works from './slices/workSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: users,
        news: news,
        works: works
    }
});