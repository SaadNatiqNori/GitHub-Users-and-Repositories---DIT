import React, { useState } from 'react';
// Others
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
    // Router
    const router = useRouter();
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Function to check if the link is active
    const isActive = (path: string) => router.pathname === path;

    return (
        <nav className="bg-white  sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <svg className="h-8 w-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">GitHub Users and Repositories</span>
                            <span className="text-lg font-bold text-gray-900 sm:hidden">GitHub U&R</span>
                        </Link>
                    </div>

                    {/* Desktop Navs */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`${isActive('/') ? '!text-amber-900 !underline font-medium' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                            Home
                        </Link>
                        <Link href="/profile" className={`${isActive('/profile') ? '!text-amber-900 !underline font-medium' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                            My Profile
                        </Link>
                        <Link href="/repositories" className={`${isActive('/repositories') ? '!text-amber-900 !underline font-medium' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                            Repositories
                        </Link>
                        <Link href="/search" className={`${isActive('/search') ? '!text-amber-900 !underline font-medium' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                            Search Users
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                    <Link
                        href="/"
                        className={`${isActive('/') ? 'bg-amber-50 border-amber-500 text-amber-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/profile"
                        className={`${isActive('/profile') ? 'bg-amber-50 border-amber-500 text-amber-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        My Profile
                    </Link>
                    <Link
                        href="/repositories"
                        className={`${isActive('/repositories') ? 'bg-amber-50 border-amber-500 text-amber-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Repositories
                    </Link>
                    <Link
                        href="/search"
                        className={`${isActive('/search') ? 'bg-amber-50 border-amber-500 text-amber-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Search Users
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;