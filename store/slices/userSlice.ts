// Redux
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// Types
import { GitHubUser, UserState } from '@/types/github';
// API Config
import { githubApi } from '@/lib/api';

// Init states
const initialState: UserState = {
    currentUser: null,
    searchedUsers: [],
    selectedUser: null,
    loading: false,
    error: null,
    searchHistory: [],
    searchPage: 1,
    searchPerPage: 30,
    searchHasMore: false,
};

// Async thunks
export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            return await githubApi.getCurrentUser();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch current user');
        }
    }
);

export const searchUsers = createAsyncThunk(
    'user/searchUsers',
    async (
        { query, page = 1, perPage = 10 }: { query: string; page?: number; perPage?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await githubApi.searchUsers(query, page, perPage);
            return { items: response.items, page, perPage, totalCount: response.total_count };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to search users');
        }
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (username: string, { rejectWithValue }) => {
        try {
            return await githubApi.getUser(username);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'User not found');
        }
    }
);

// Slice creation
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedUser: (state, action: PayloadAction<GitHubUser | null>) => {
            state.selectedUser = action.payload;
        },
        addToSearchHistory: (state, action: PayloadAction<string>) => {
            const query = action.payload;
            if (!state.searchHistory.includes(query)) {
                state.searchHistory.unshift(query);
                state.searchHistory = state.searchHistory.slice(0, 10); // Keep only last 10
            }
        },
        clearSelectedUser(state) {
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        // Current user
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search users
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg.page === 1) {
                    // First page: replace
                    state.searchedUsers = action.payload.items;
                } else {
                    // Append for subsequent pages
                    state.searchedUsers = [...state.searchedUsers, ...action.payload.items];
                }
                state.searchPage = action.payload.page;
                state.searchPerPage = action.payload.perPage;
                state.searchHasMore = state.searchedUsers.length < action.payload.totalCount;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch user
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, setSelectedUser, addToSearchHistory, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;