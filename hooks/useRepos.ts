import { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// Slices
import { fetchUserRepos, searchRepos } from '@/store/slices/repoSlice';

export const useRepos = (username?: string) => {
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const { repositories, searchResults, loading, error, sortBy, filterBy, page, perPage, hasMore } = useSelector((state: RootState) => state.repo);

    // Change page number handler for style 1
    const changePage = (newPage: number) => {
        if (!username) return;
        dispatch(fetchUserRepos({ username, page: newPage, perPage }));
    };

    // Search in Repositories handler
    const searchRepositories = (query: string) => {
        dispatch(searchRepos({ query, page: 1, perPage: 30 }));
    };

    // Filter and sort repositories
    const filteredRepos = (searchResults?.length == 0 ? repositories : searchResults).filter(repo => {
        if (!filterBy) return true;
        return repo.language?.toLowerCase().includes(filterBy.toLowerCase()) ||
            repo.name.toLowerCase().includes(filterBy.toLowerCase()) ||
            repo.description?.toLowerCase().includes(filterBy.toLowerCase());
    });
    const sortedRepos = [...filteredRepos].sort((a, b) => {
        switch (sortBy) {
            case 'stars':
                return (b.stargazers_count || 0) - (a.stargazers_count || 0);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'updated':
            default:
                return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
        }
    });

    // Reset repos when switching users
    useEffect(() => {
        if (username) {
            dispatch({ type: 'repo/resetRepositories' });
            dispatch(fetchUserRepos({ username, page: 1, perPage }));
        }
    }, [username]);

    return {
        repositories: sortedRepos,
        loading,
        error,
        searchRepositories,
        page,
        perPage,
        hasMore,
        changePage,
    };
};

// Usage
// Manage GitHub repositories with support for fetching, searching, filtering, sorting, and pagination, automatically updating when the username changes.