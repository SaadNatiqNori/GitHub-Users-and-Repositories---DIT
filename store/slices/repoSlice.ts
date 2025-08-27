// Redux
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Types
import { GitHubSearchResponse, RepoState } from '@/types/github';
// API Config
import { githubApi } from '@/lib/api';

// Init states
const initialState: RepoState = {
    searchResults: [],
    searchPage: 1,
    searchPerPage: 30,
    searchHasMore: false,
    searchQuery: '',
    totalCount: 0,
    repositories: [],
    contributors: {},
    loading: false,
    error: null,
    sortBy: 'updated',
    filterBy: '',
    page: 1,
    perPage: 30,
    hasMore: true,
};

// Async thunks
export const fetchUserRepos = createAsyncThunk(
    'repo/fetchUserRepos',
    async ({ username, page, perPage }: { username: string; page: number; perPage: number }, { rejectWithValue }) => {
        try {
            const repos = await githubApi.getUserRepos(username, page, perPage);
            return { repos, page, perPage };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch repositories');
        }
    }
);

export const searchRepos = createAsyncThunk(
    'repo/searchRepos',
    async (
        { query, page, perPage }: { query: string; page: number; perPage: number },
        { rejectWithValue }
    ) => {
        try {
            const res: GitHubSearchResponse = await githubApi.searchRepos(query, page, perPage);
            return { items: res.items, page, perPage, query, totalCount: res.total_count };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to search repositories');
        }
    }
);

export const fetchRepoContributors = createAsyncThunk(
    'repo/fetchRepoContributors',
    async ({ owner, repo, repoId }: { owner: string; repo: string; repoId: number }, { rejectWithValue }) => {
        try {
            const contributors = await githubApi.getRepoContributors(owner, repo);
            return { repoId, contributors };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contributors');
        }
    }
);

// Slice creation
const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; },
        setSortBy: (state, action) => { state.sortBy = action.payload; },
        setFilterBy: (state, action) => { state.filterBy = action.payload; },
        setPage: (state, action) => { state.page = action.payload; },
        setPerPage: (state, action) => { state.perPage = action.payload; },
        resetSearch: (state) => {
            state.searchResults = [];
            state.searchPage = 1;
            state.searchPerPage = 10;
            state.searchHasMore = false;
            state.searchQuery = '';
            state.totalCount = 0;
            state.loading = false;
            state.error = null;
        },
        resetRepositories: (state) => {
            state.repositories = [];
            state.page = 1;
            state.perPage = 30;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        // Fetch user repos
        builder
            .addCase(fetchUserRepos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchUserRepos.fulfilled, (state, action) => {
                state.loading = false;
                // Append if page > 1, otherwise replace
                if (action.payload.page > 1) {
                    state.repositories = [...state.repositories, ...action.payload.repos];
                } else {
                    state.repositories = action.payload.repos;
                }
                state.page = action.payload.page;
                state.perPage = action.payload.perPage;
                state.hasMore = action.payload.repos.length === action.payload.perPage;
            })

            .addCase(fetchUserRepos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search repos
        builder
            .addCase(searchRepos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRepos.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg.page > 1) {
                    state.searchResults = [...state.searchResults, ...action.payload.items];
                } else {
                    state.searchResults = action.payload.items;
                }
                state.searchPage = action.meta.arg.page;
                state.searchHasMore = action.payload.items.length === action.meta.arg.perPage;
            })
            .addCase(searchRepos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch contributors
        builder
            .addCase(fetchRepoContributors.fulfilled, (state, action) => {
                const { repoId, contributors } = action.payload;
                state.contributors[repoId] = contributors;
            });
    },
});

export const { clearError, setSortBy, setFilterBy, resetSearch, resetRepositories } = repoSlice.actions;
export default repoSlice.reducer;