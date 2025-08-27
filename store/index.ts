// Redux config
import { configureStore } from '@reduxjs/toolkit';
// Slices
import userReducer from './slices/userSlice';
import repoReducer from './slices/repoSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        repo: repoReducer,
    },
});

// Extra config
export type RootState = ReturnType<typeof store.getState> & {
    repo: {
        contributors: Record<string, any>;
    };
};
export type AppDispatch = typeof store.dispatch;