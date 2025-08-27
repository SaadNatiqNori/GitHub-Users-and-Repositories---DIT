import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// Slices
import { searchUsers, fetchUser, addToSearchHistory, clearSelectedUser } from '@/store/slices/userSlice';
import { fetchUserRepos, resetRepositories } from '@/store/slices/repoSlice';
// Components
import UserCard from '@/components/UserCard';
import UserCardSmall from '@/components/UserCardSmall';
import RepositoryCard from '@/components/RepositoryCard';
import SearchInput from '@/components/SearchInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
// Hooks
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRepos } from '@/hooks/useRepos';

const Search: React.FC = () => {
    // Refs
    const lastQueryRef = useRef<string>('');
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const { searchedUsers, selectedUser, loading, error, searchPage, searchHasMore } = useSelector((state: RootState) => state.user);
    // Hooks
    const { repositories, loading: repoLoading, page, hasMore, changePage } = useRepos(selectedUser?.login);
    const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('github-search-history', []);
    // States
    const [showRepositories, setShowRepositories] = useState(false);
    // Others
    const router = useRouter();

    // Search handler
    const handleSearch = async (query: string) => {
        // Store last query
        lastQueryRef.current = query;
        dispatch(addToSearchHistory(query));
        setSearchHistory(prev => {
            const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 30);
            return newHistory;
        });
        // Calling (dispatching) the API
        await dispatch(searchUsers({ query, page: 1, perPage: 30 }));
        setShowRepositories(false);
    };

    // When one user card selected (clicked)
    const handleUserSelect = async (user: any) => {
        await dispatch(fetchUser(user.login));
        await dispatch(fetchUserRepos(user.login));
        setShowRepositories(true);

        // Update URL without navigation
        // (shallow) Change the URL, but don't run data fetching methods again.
        router.push(`/search?user=${user.login}`, undefined, { shallow: true });
    };

    // History budges click handler
    const handleHistoryClick = (query: string) => {
        handleSearch(query);
    };

    // Load more items handler (Pagination Purposes)
    const handleLoadMore = async () => {
        if (!searchedUsers.length || !searchHasMore) return;
        await dispatch(searchUsers({
            query: lastQueryRef.current,
            page: searchPage + 1,
            perPage: 30
        }));
    };

    // Clear search results on unmount
    useEffect(() => {
        return () => {
            dispatch(resetRepositories());
            dispatch(clearSelectedUser());
        };
    }, []);

    return (
        <>
            {/* Header */}
            <Head>
                <title>Search Users - GitHub Users and Repositories</title>
            </Head>

            {/* Content */}
            <div className="min-h-screen">
                {/* GitHub-style header with search */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-5">
                        <div className="py-4">
                            {/* Title & Search Input */}
                            <div className="flex items-center space-x-3 mb-4 md:mb-8">
                                <div className='bg-gray-700/10 flex justify-center items-center rounded-lg p-2'>
                                    <svg aria-hidden="true" focusable="false" className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" display="inline-block" overflow="visible" ><path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path></svg>
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900 min-w-fit pe-2">Search GitHub Users</h1>
                                <div className='w-full h-[1px] bg-gray-200'></div>
                            </div>
                            <div className="max-w-2xl">
                                <SearchInput
                                    placeholder="Search users..."
                                    onSearch={handleSearch}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-6">
                    <div className="space-y-6">
                        {/* Recent Searches Budges */}
                        {searchHistory && searchHistory?.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h2 className="text-sm font-semibold text-[#7d8590] mb-3 uppercase tracking-wide">Recent Searches</h2>
                                <div className="flex flex-wrap gap-2">
                                    {searchHistory.map((query, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setShowRepositories(false);
                                                dispatch(clearSelectedUser());
                                                handleHistoryClick(query);
                                            }}
                                            className="px-3 py-1 bg-white border border-gray-200 text-black rounded-full hover:bg-gray-200 transition-colors text-sm"
                                        >
                                            {query}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* On error */}
                        {error && (
                            <div className="bg-[#da3633]/10 border border-[#f85149] rounded-lg p-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-[#f85149] mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                    </svg>
                                    <ErrorMessage message={error} />
                                </div>
                            </div>
                        )}

                        {/* On Loading */}
                        {loading && (
                            <div className="flex justify-center py-12">
                                <LoadingSpinner />
                            </div>
                        )}

                        {/* Pagination and User Cards */}
                        {searchedUsers.length > 0 && !selectedUser && (
                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black">
                                        {searchedUsers.length} users
                                    </h2>
                                    <button className="text-sm text-[#7d8590]" onClick={() => {
                                        window.location.reload()
                                    }}>
                                        CLEAR
                                    </button>
                                </div>

                                {/* Users Cards */}
                                <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {searchedUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            <UserCardSmall user={user} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {searchHasMore && (
                                    <div className="text-center mt-8">
                                        <button
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            onClick={handleLoadMore}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Load More Repositories
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Selected User Details Section */}
                        {selectedUser && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    {/* Title and back button */}
                                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                        <h2 className="text-lg font-semibold text-black flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                            </svg>
                                            User Profile
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowRepositories(false);
                                                dispatch(clearSelectedUser());
                                            }}
                                            className="text-[#2486f6] hover:text-[#79c0ff] flex items-center text-sm font-medium underline"
                                        >
                                            Back to search
                                        </button>
                                    </div>
                                    {/* User info details */}
                                    <div className="p-2 md:p-6">
                                        <UserCard user={selectedUser} />
                                    </div>
                                </div>

                                {/* Repositories */}
                                {showRepositories && (
                                    <div className="bg-white border border-gray-200 rounded-lg">
                                        {/* Title */}
                                        <div className="p-4 border-b border-gray-200">
                                            <h2 className="text-lg font-semibold text-black flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Repositories
                                                <span className="ml-2 px-2 py-0.5 bg-[#21262d] text-white text-xs rounded-full">
                                                    {repositories.length}
                                                </span>
                                            </h2>
                                        </div>

                                        <div className="p-2 md:p-6">
                                            {/* Conditional rendering repos */}
                                            {repoLoading ? (
                                                <div className="flex justify-center py-12">
                                                    <LoadingSpinner />
                                                </div>
                                            ) : repositories.length > 0 ? (
                                                <div className="space-y-4">
                                                    {repositories.map((repo) => (
                                                        <div
                                                            key={repo.id}
                                                        >
                                                            <RepositoryCard repository={repo} />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <svg className="w-12 h-12 text-[#6e7681] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    <p className="text-[#7d8590] font-medium">No public repositories</p>
                                                    <p className="text-[#6e7681] text-sm mt-1">This user doesn't have any public repositories yet.</p>
                                                </div>
                                            )}

                                            {/* Pagination */}
                                            {hasMore && !repoLoading && (
                                                <div className="text-center mt-6 pt-6 border-t border-gray-200">
                                                    <button
                                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                        onClick={() => changePage(page + 1)}
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                                </svg>
                                                                Load More Repositories
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* No data found fallback */}
                        {!loading && !error && searchedUsers.length === 0 && !selectedUser && (
                            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                <div className="text-[#6e7681] mb-6">
                                    <svg className="h-24 w-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-black/80 mb-2">Find a GitHub user</h3>
                                <p className="text-[#7d8590] max-w-md mx-auto">
                                    Search for GitHub users by their username to explore their profiles and repositories.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;