import { configureStore } from '@reduxjs/toolkit';
import users from './slices/userSlice';
import news from './slices/newSlice';
import works from './slices/workSlice';


export const store = configureStore({
    reducer: {
        users: users,
        news: news,
        works: works
    }
});