import React from 'react';
import Image from 'next/image';
// Types
import { UserCardProps } from '@/types/github';
// Helpers
import { formatDate } from '@/constants/helpers';

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg max-w-7xl mx-auto ${onClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200' : ''}`}
            onClick={onClick}>

            {/* Logo, Name, Bio, Profile Img */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-start space-x-4">
                    <div className="relative">
                        <Image
                            src={user?.avatar_url}
                            alt={`${user?.login}'s avatar`}
                            className="md:h-20 h-16 w-16 md:w-20 rounded-full border border-gray-200"
                            width={80}
                            height={80}
                        />
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 md:mb-1">
                            <h3 className="text-xl font-semibold text-gray-900 truncate">
                                {user.name || user.login}
                            </h3>
                            {user.name && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    Pro
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 text-sm md:text-base md:mb-2">@{user.login}</p>
                        {user.bio && (
                            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">{user.bio}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats: Repos, Followers, Following, Gists */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center group cursor-pointer">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-1">
                                <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                                </svg>
                                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {user.public_repos}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">Repositories</div>
                        </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-1">
                                <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {user.followers}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">Followers</div>
                        </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-1">
                                <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {user.following}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">Following</div>
                        </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-1">
                                <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353L4.207 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {user.public_gists}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">Gists</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location, Company, Email */}
            {(user.location || user.company || user.email) && (
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="space-y-3">
                        {user.location && (
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="h-4 w-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.company && (
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="h-4 w-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm1-5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-3zm5 0a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-3zm5 0a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zm1-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2z" />
                                </svg>
                                <span>{user.company}</span>
                            </div>
                        )}
                        {user.email && (
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="h-4 w-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                </svg>
                                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                                    {user.email}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Joined At, View on GitHub */}
            <div className="px-6 py-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <span>Joined {formatDate(user.created_at)}</span>
                    </div>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-fit mt-2 md:mt-0 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg className="mr-2 h-4 min-w-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserCard;