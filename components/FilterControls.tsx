import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// Slices
import { setSortBy, setFilterBy } from '@/store/slices/repoSlice';

const FilterControls: React.FC = () => {
    // Dispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selectors
    const { sortBy, filterBy } = useSelector((state: RootState) => state.repo);

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Most Stars</option>
                    <option value="name">Name (A-Z)</option>
                </select>
            </div>
            {/* Search Input */}
            <div className="flex items-center space-x-2 flex-1">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <input
                    type="text"
                    value={filterBy}
                    onChange={(e) => dispatch(setFilterBy(e.target.value))}
                    placeholder="Filter by language, name, or description..."
                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default FilterControls;