import React, { useEffect } from 'react';
import Head from 'next/head';
// Redux
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
// Slices
import { fetchCurrentUser } from '@/store/slices/userSlice';
import { fetchUserRepos } from '@/store/slices/repoSlice';
// Components
import UserCard from '@/components/UserCard';
import RepositoryCard from '@/components/RepositoryCard';
import FilterControls from '@/components/FilterControls';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
// Hooks
import { useRepos } from '@/hooks/useRepos';

const Profile: React.FC = () => {
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const { currentUser, loading: userLoading, error: userError } = useSelector((state: RootState) => state.user);
    // Hooks
    const { repositories, loading: repoLoading, page, hasMore, changePage } = useRepos(currentUser?.login);

    // Load more items handler (Pagination Purposes)
    const loadMore = () => {
        if (!currentUser || !hasMore) return;
        changePage(page + 1);
    };

    // Get user info (details) on mount
    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    // Initial fetch with page=1 (Pagination Purposes)
    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUserRepos({ username: currentUser.login, page: 1, perPage: 30 }));
        }
    }, [dispatch, currentUser]);

    // On loading data
    if (userLoading) {
        return (
            <>
                <Head>
                    <title>My Profile - GitHub Users and Repositories</title>
                </Head>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="bg-gray-200 rounded-full h-8 w-8 animate-pulse"></div>
                            <div className="bg-gray-200 rounded h-8 w-48 animate-pulse"></div>
                        </div>
                        <div className="flex justify-center py-12">
                            <LoadingSpinner />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    // On Error
    if (userError) {
        return (
            <>
                <Head>
                    <title>My Profile - GitHub Users and Repositories</title>
                </Head>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Title & Error Message */}
                        <div className="flex items-center space-x-3 mb-8">
                            <div className='bg-gray-700/10 flex justify-center items-center rounded-lg p-2'>
                                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 min-w-fit pe-2">My Profile</h1>
                            <div className='w-full h-[1px] bg-gray-200'></div>
                        </div>

                        <div className="bg-white border border-red-200 rounded-lg p-6 mb-6">
                            <ErrorMessage
                                message={userError}
                                onRetry={() => dispatch(fetchCurrentUser())}
                            />
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-lg font-medium text-blue-900 mb-2">Setup Required</h2>
                                    <p className="text-blue-800 mb-4">
                                        To view your profile, you need to configure a GitHub Personal Access Token.
                                    </p>
                                    <div className="bg-blue-100 rounded-lg p-4 mb-4">
                                        <h3 className="text-sm font-medium text-blue-900 mb-3">Setup Steps:</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                                            <li>Go to <a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">GitHub Settings → Developer settings → Personal access tokens</a></li>
                                            <li>Click &quot;Generate new token (classic)&quot;</li>
                                            <li>Give it a name and select scopes (at minimum: read:user, repo)</li>
                                            <li>Add the token to your environment variables as NEXT_PUBLIC_GITHUB_TOKEN</li>
                                        </ol>
                                    </div>
                                    <a
                                        href="https://github.com/settings/personal-access-tokens"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md !text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Create Token
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    // When no data found
    if (!currentUser) {
        return (
            <>
                <Head>
                    <title>My Profile - GitHub Users and Repositories</title>
                </Head>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className='bg-gray-700/10 flex justify-center items-center rounded-lg p-2'>
                                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 min-w-fit pe-2">My Profile</h1>
                            <div className='w-full h-[1px] bg-gray-200'></div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-12">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 30c4.664 0 8.673 2.539 10.713 6.286" />
                                </svg>
                                <h2 className="mt-4 text-lg font-medium text-gray-900">No Profile Data</h2>
                                <p className="mt-2 text-gray-600">No user data available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Header */}
            <Head>
                <title>{currentUser.name || currentUser.login} - GitHub Users and Repositories</title>
            </Head>

            {/* Content */}
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* My Profile sections */}
                    <div className="flex items-center space-x-3 mb-8">
                        <div className='bg-gray-700/10 flex justify-center items-center rounded-lg p-2'>
                            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 min-w-fit pe-2">My Profile</h1>
                        <div className='w-full h-[1px] bg-gray-200'></div>
                    </div>

                    {/* Profile Card */}
                    <div className="mb-8">
                        <UserCard user={currentUser} />
                    </div>

                    {/* My Repositories section */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                        {/* Title */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                                    </svg>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Repositories
                                    </h2>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {repositories.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Filter Controls Component */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <FilterControls />
                        </div>

                        {/* Conditional rendering data */}
                        <div className="px-2 md:px-6 py-6">
                            {repoLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                <>
                                    {repositories.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {repositories.map((repo) => (
                                                <React.Fragment key={repo.id}>
                                                    <RepositoryCard repository={repo} />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ) : (
                                        /* No data found fallback */
                                        <div className="text-center py-12">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H9a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2zM21 11h10a2 2 0 012 2v8a2 2 0 01-2 2H21" />
                                            </svg>
                                            <h3 className="mt-4 text-lg font-medium text-gray-900">No repositories found</h3>
                                            <p className="mt-2 text-gray-600">
                                                You don&apos;t have any public repositories yet.
                                            </p>
                                            <div className="mt-6">
                                                <a
                                                    href="https://github.com/new"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600/20 hover:bg-green-700/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Create your first repository
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Load More Button */}
                                    {!repoLoading && repositories.length > 0 && hasMore && (
                                        <div className="text-center mt-8 pt-6 border-t border-gray-200">
                                            <button
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                onClick={loadMore}
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Load More Repositories
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;