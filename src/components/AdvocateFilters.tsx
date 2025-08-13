import React from 'react';

interface FilterOptions {
  degree: string[];
  experience: string[];
  cities: string[];
}

interface AdvocateFiltersProps {
  filters: {
    degree: string;
    experience: string;
    city: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  options: FilterOptions;
}

export default function AdvocateFilters({ filters, onFilterChange, options }: AdvocateFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Advocates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="degree-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Degree
          </label>
          <select
            id="degree-filter"
            value={filters.degree}
            onChange={(e) => onFilterChange('degree', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Degrees</option>
            {options.degree.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="experience-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <select
            id="experience-filter"
            value={filters.experience}
            onChange={(e) => onFilterChange('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Experience Levels</option>
            {options.experience.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            id="city-filter"
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Cities</option>
            {options.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
