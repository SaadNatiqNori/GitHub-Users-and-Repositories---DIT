import React, { useState, useEffect } from 'react';
// Hooks
import { useDebounce } from '@/hooks/useDebounce';
// Types
import { SearchInputProps } from '@/types/github';

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
    onSearch,
    loading = false,
    debounceMs = 500
}) => {
    // States
    const [query, setQuery] = useState('');
    // Hooks
    const debouncedQuery = useDebounce(query, debounceMs);

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    // For debounce purposes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (debouncedQuery.trim()) {
            onSearch(debouncedQuery.trim());
        }
    }, [debouncedQuery]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex">
                {/* Input Field */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                />
                {/* Search Button */}
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                    {/* On Loading */}
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchInput;