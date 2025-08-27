import React from 'react';
import Image from 'next/image';
// Types
import { UserCardProps } from '@/types/github';

const UserCardSmall: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg max-w-7xl mx-auto p-3 md:p-6 ${onClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200' : ''} cursor-pointer`}
            onClick={onClick}>

            {/* Header with avatar and basic info */}
            <div className="relative z-10 flex items-center space-x-4 mb-6">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-white shadow-lg transition-transform duration-300 ">
                        <Image
                            src={user.avatar_url}
                            alt={`${user.login}'s avatar`}
                            className="w-full h-full object-cover"
                            width={80}
                            height={80}
                        />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-0 md:mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                            {user.login}
                        </h3>
                        {user.site_admin && (
                            <div className="px-2 flex justify-center items-center py-[6px] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                <span className="text-[8px] font-bold text-black">ADMIN</span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">#{user.id}</p>
                    <div className="flex items-center mt-1 space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {user.type}
                        </span>
                        <span className="text-xs text-gray-500">Score: {user.score}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500 flex items-center">
                    <span className="mr-1">🔗</span>
                    <span>GitHub Profile</span>
                </div>

                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-xl border border-gray-200"
                >
                    <svg className="mr-2 h-4 w-4 transition-transform duration-300" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    View Profile
                </a>
            </div>

        </div>
    );
};

export default UserCardSmall;