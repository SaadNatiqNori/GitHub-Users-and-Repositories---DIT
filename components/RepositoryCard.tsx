import React, { useEffect } from 'react';
import Image from 'next/image';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// Slices
import { fetchRepoContributors } from '@/store/slices/repoSlice';
// Types
import { Contributor, RepositoryCardProps } from '@/types/github';
// Helpers
import { formatDate, getLanguageColor } from '@/constants/helpers';

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const contributors = useSelector(
        (state: RootState) => state.repo.contributors[repository?.id]
    );

    // Fetch contributors on mount
    useEffect(() => {
        const [owner] = repository?.full_name.split('/');
        dispatch(fetchRepoContributors({ owner, repo: repository?.name, repoId: repository?.id }));
    }, [dispatch, repository?.full_name, repository?.name, repository?.id]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            {/* Name and Description */}
            <div className="p-4 pb-0">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <svg className="h-4 w-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline truncate">
                                <a href={repository?.html_url} target="_blank" rel="noopener noreferrer">
                                    {repository?.name}
                                </a>
                            </h3>
                            {repository?.private && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                    Private
                                </span>
                            )}
                        </div>
                        {repository?.description && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">
                                {repository?.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Topics */}
                {repository?.topics && repository?.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {repository?.topics.slice(0, 5).map((topic) => (
                            <span
                                key={topic}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                            >
                                {topic}
                            </span>
                        ))}
                        {repository?.topics.length > 5 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                +{repository?.topics.length - 5} more
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Language, Stars, Forks, Contributors */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 md:space-x-4 text-sm text-gray-600">
                        {repository?.language && (
                            <div className="flex items-center space-x-1.5">
                                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository?.language)}`}></div>
                                <span className="font-medium">{repository?.language}</span>
                            </div>
                        )}

                        <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" />
                            </svg>
                            <span>{repository?.stargazers_count?.toLocaleString() || 0}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
                            </svg>
                            <span>{repository?.forks_count?.toLocaleString() || 0}</span>
                        </div>

                        {(contributors?.length ?? 0) > 0 && (
                            <div className="flex items-center space-x-1">
                                <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.012.75.75 0 11-1.44.47 3.507 3.507 0 00-6.68 0 .75.75 0 01-1.44-.47 5.01 5.01 0 012.56-3.012A3.001 3.001 0 0111 4z" />
                                </svg>
                                <span>{contributors.length}</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Top Contributors */}
            {(contributors?.length ?? 0) > 0 && (
                <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">Contributors</span>
                            <div className="flex -space-x-1">
                                {contributors.slice(0, 5).map((contributor: Contributor) => (
                                    <Image
                                        key={contributor?.id}
                                        src={contributor?.avatar_url || ''}
                                        alt={contributor?.login || 'repo'}
                                        className="inline-block h-6 w-6 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition-transform cursor-pointer"
                                        title={`${contributor?.login} (${contributor?.contributions} contributions)`}
                                        width={24}
                                        height={24}
                                    />
                                ))}
                                {contributors.length > 5 && (
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 border-2 border-white text-xs font-medium text-gray-600">
                                        +{contributors.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Updated At, Links */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z" />
                        </svg>
                        <span><span className='hidden md:inline-block'>Updated</span> {formatDate(repository?.updated_at)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a
                            href={repository?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                            View
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(repository?.clone_url)}
                            className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                            </svg>
                            <span>Clone</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepositoryCard;