import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// Redux
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
// Slices
import { fetchCurrentUser } from '@/store/slices/userSlice';
// Components
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const Home: React.FC = () => {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  // Selectors
  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);

  // Fetch user info (details) on mount
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>GitHub Users and Repositories - Home</title>
        <meta name="description" content="Explore GitHub users and repositories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title & Description */}
            <div className="text-center mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center mb-6 md:mb-2">
                {/* KRG logo */}
                <div className="bg-gray-900 rounded-full md:mr-4">
                  <Image src="https://yt3.googleusercontent.com/MXkK0Nv0dAoUA9jBkhCNIjFfeOXH1MnhcuInJzcmY1oNXcFlUQTGRuop3Ui34TD2w0JQ_qAHBQ=s900-c-k-c0x00ffffff-no-rj" alt="dit-krg" width={75} height={75} className='object-cover w-[75px] h-[75px]' />
                </div>

                <h1 className="text-4xl font-semibold text-gray-900">
                  GitHub Users and Repositories
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover GitHub users, explore repositories, and analyze code contributions
              </p>
            </div>

            {/* Navigation Cards - GitHub Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mb-8">
              <Link href="/profile" className="group block">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 rounded-lg p-2 mr-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      My Profile
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    View your GitHub profile, repositories, and contribution activity
                  </p>
                  <div className="flex items-center mt-4 text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                    <span>View profile</span>
                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link href="/search" className="group block">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-50 rounded-lg p-2 mr-3">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      Search Users
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Find and explore GitHub users, their repositories and contributions
                  </p>
                  <div className="flex items-center mt-4 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    <span>Start searching</span>
                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link href="/repositories" className="group block">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-50 rounded-lg p-2 mr-3">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Repositories
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Search and explore public repositories across GitHub
                  </p>
                  <div className="flex items-center mt-4 text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                    <span>Browse repos</span>
                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* On Loading */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Current User</h2>
                <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            </div>
          )}

          {/* On Error */}
          {error && (
            <div className="bg-white border border-red-200 rounded-lg p-8 mb-6">
              <div className="flex items-center mb-6">
                <div className="bg-red-50 rounded-lg p-2 mr-3">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Authentication Required</h2>
              </div>
              <div className="mb-6">
                <ErrorMessage message={error} onRetry={() => dispatch(fetchCurrentUser())} />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-blue-900 mb-2">
                      Setup GitHub Personal Access Token
                    </h3>
                    <p className="text-sm text-blue-700 mb-3">
                      To view your profile and access GitHub data, you need to create a Personal Access Token.
                    </p>
                    <a
                      href="https://github.com/settings/personal-access-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Create Token
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User info section */}
          {currentUser && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between md:mb-6">
                  <div className="flex items-start md:items-center mb-4 sm:mb-0">
                    <div className="h-3 w-3 bg-green-400 rounded-full mr-3 mt-2 md:mt-0"></div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Welcome back, {currentUser.name || currentUser.login}!
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Ready to explore GitHub
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="inline-flex w-fit items-center px-4 py-2 ms-5 md:ms-0 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <UserCard user={currentUser} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;