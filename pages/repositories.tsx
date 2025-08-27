import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// Slices
import { resetSearch, searchRepos } from '@/store/slices/repoSlice';
// Components
import RepositoryCard from '@/components/RepositoryCard';
import FilterControls from '@/components/FilterControls';
import SearchInput from '@/components/SearchInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
// Hooks
import { useLocalStorage } from '@/hooks/useLocalStorage';
// Static Data
import { recommendationsData } from '@/constants/data';

const Repositories: React.FC = () => {
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const { searchResults, loading, error, sortBy, filterBy, searchPage, searchHasMore } =
        useSelector((state: RootState) => state.repo);
    // Hooks
    const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('github-repo-search-history', []);
    // States
    const [hasSearched, setHasSearched] = useState(false);
    // Refs (used for storing last query)
    const lastQueryRef = useRef<string>("");

    // Search handler
    // We are using useCallback here to memoize the handleSearch function, meaning it will only be recreated if one of its dependencies (dispatch or setSearchHistory) changes.
    const handleSearch = useCallback(
        async (query: string) => {
            if (!query.trim() || query === lastQueryRef.current) return;
            // Store last query
            lastQueryRef.current = query;
            setHasSearched(true);
            setSearchHistory(prev => [query, ...prev.filter(item => item !== query)].slice(0, 10));
            // Calling (dispatching) the API
            await dispatch(searchRepos({ query, page: 1, perPage: 30 }));
        },
        [dispatch, setSearchHistory]
    );

    // History budges click handler
    const handleHistoryClick = (query: string) => {
        handleSearch(query);
    };

    // Filter and sort repositories
    const filteredRepos = searchResults.filter(repo => {
        if (!filterBy) return true;
        return repo.language?.toLowerCase().includes(filterBy.toLowerCase()) ||
            repo.name.toLowerCase().includes(filterBy.toLowerCase()) ||
            repo.description?.toLowerCase().includes(filterBy.toLowerCase());
    });
    const sortedRepos = [...filteredRepos].sort((a, b) => {
        switch (sortBy) {
            case 'stars':
                return b.stargazers_count - a.stargazers_count;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'updated':
            default:
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
    });

    // Load more items handler (Pagination Purposes)
    const handleLoadMore = async () => {
        if (!lastQueryRef.current || !searchHasMore) return;
        await dispatch(searchRepos({ query: lastQueryRef.current, page: searchPage + 1, perPage: 30 }));
    };

    // Clear search results on unmount
    useEffect(() => {
        return () => {
            dispatch(resetSearch());
        };
    }, [dispatch]);

    return (
        <>
            {/* Header */}
            <Head>
                <title>Search Repositories - GitHub Users and Repositories</title>
            </Head>

            {/* Content */}
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-8 py-6">
                    {/* Title and Search Input */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4 md:mb-8">
                            <div className='bg-gray-700/10 flex justify-center items-center rounded-lg p-2'>
                                <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 min-w-fit pe-2">Search Repositories</h1>
                            <div className='w-full h-[1px] bg-gray-200'></div>
                        </div>
                        <div className="max-w-2xl">
                            <SearchInput
                                placeholder="Search repositories by name, language, topic..."
                                onSearch={handleSearch}
                                loading={loading}
                            />
                        </div>
                    </div>

                    {/* Recent Searches Budges */}
                    {searchHistory && searchHistory?.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-base font-medium text-gray-900">Recent Searches</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {searchHistory.map((query, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleHistoryClick(query)}
                                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="mr-1.5 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {query}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setSearchHistory([])}
                                    className="inline-flex items-center px-2 py-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                                    title="Clear search history"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* On error */}
                    {error && (
                        <div className="bg-white border border-red-200 rounded-lg p-6 mb-6">
                            <ErrorMessage message={error} />
                        </div>
                    )}

                    {/* Filter Controls and Search result stats */}
                    {hasSearched && (
                        <div className="bg-white border border-gray-200 rounded-lg mb-6">
                            {/* Stats */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                {/* Mobile Show */}
                                <div className='w-full flex justify-between items-center mb-2 md:hidden'>
                                    <h2 className="text-lg font-medium text-gray-900 inline-block md:hidden">Search Results</h2>
                                    <button onClick={() => {
                                        setHasSearched(false);
                                        lastQueryRef.current = "";
                                        dispatch(resetSearch());
                                    }} className='cursor-pointer text-sm uppercase inline-block md:hidden'>Clear</button>
                                </div>
                                {/* Non Mobile */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <h2 className="text-lg font-medium text-gray-900 hidden md:inline-block">Search Results</h2>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {sortedRepos.length.toLocaleString()} repositories
                                        </span>
                                        {lastQueryRef.current && (
                                            <span className="text-sm text-gray-500">
                                                for "{lastQueryRef.current}"
                                            </span>
                                        )}
                                    </div>
                                    <button onClick={() => {
                                        setHasSearched(false);
                                        lastQueryRef.current = "";
                                        dispatch(resetSearch());
                                    }} className='cursor-pointer text-sm uppercase hidden md:inline-block'>Clear</button>
                                </div>
                            </div>
                            {/* Filter Controls */}
                            <div className="px-6 py-4 bg-gray-50">
                                <FilterControls />
                            </div>
                        </div>
                    )}

                    {/* On loading */}
                    {loading && (
                        <div className="flex justify-center py-12">
                            <LoadingSpinner />
                        </div>
                    )}

                    {/* Pagination and sorted repos */}
                    {hasSearched && sortedRepos.length > 0 && !loading && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {sortedRepos.map((repo) => (
                                    <div key={repo.id}>
                                        <RepositoryCard repository={repo} />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {searchHasMore && (
                                <div className="text-center">
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
                        </>
                    )}

                    {/* No data found fallback */}
                    {hasSearched && !loading && !error && sortedRepos.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-12">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H9a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2zM21 11h10a2 2 0 012 2v8a2 2 0 01-2 2H21" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No Repositories Found</h3>
                                <p className="mt-2 text-gray-600 max-w-md mx-auto">
                                    We couldn't find any repositories matching "{lastQueryRef.current}". Try different keywords or check your spelling.
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => {
                                            setHasSearched(false);
                                            lastQueryRef.current = "";
                                            dispatch(resetSearch());
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Try New Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recommendation searchs before searching */}
                    {!hasSearched && !loading && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-12">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                                    <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Discover Public Repositories</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    Search millions of public repositories on GitHub. Find popular projects, explore different programming languages, and discover interesting code.
                                </p>

                                {/* Recommendations */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Popular Topics</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                                        {recommendationsData.map(({ label, query, color }) => (
                                            <button
                                                key={query}
                                                onClick={() => handleSearch(query)}
                                                className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group ${color}`}
                                            >
                                                <span className="text-sm font-medium transition-colors">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-sm text-start font-medium text-gray-900 mb-3">Search Tips</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                                        <div className="flex items-start space-x-2">
                                            <svg className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Language specific</p>
                                                <p className="text-xs text-gray-600">Search by programming language</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <svg className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Topic based</p>
                                                <p className="text-xs text-gray-600">Find projects by topic or domain</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <svg className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Project names</p>
                                                <p className="text-xs text-gray-600">Search for specific project names</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <svg className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Keywords</p>
                                                <p className="text-xs text-gray-600">Use descriptive keywords</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Repositories;