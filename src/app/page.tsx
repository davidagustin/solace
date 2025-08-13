"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import AdvocateCard from "../components/AdvocateCard";
import AdvocateFilters from "../components/AdvocateFilters";
import HeroGradient from "./components/HeroGradient";

interface Advocate {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

interface ApiResponse {
  data: Advocate[];
  total: number;
  search: string | null;
}

type ViewMode = 'table' | 'cards';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [allAdvocates, setAllAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAdvocates, setTotalAdvocates] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [filters, setFilters] = useState({
    degree: '',
    experience: '',
    city: ''
  });
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchAdvocates = async (search?: string) => {
      try {
        setLoading(true);
        const url = search 
          ? `/api/advocates?search=${encodeURIComponent(search)}`
          : "/api/advocates";
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        const jsonResponse: ApiResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setAllAdvocates(jsonResponse.data);
        setTotalAdvocates(jsonResponse.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Apply filters to the current advocates
  useEffect(() => {
    if (!allAdvocates.length) return;

    let filtered = allAdvocates;

    if (filters.degree) {
      filtered = filtered.filter(advocate => advocate.degree === filters.degree);
    }

    if (filters.experience) {
      const [min, max] = filters.experience.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(advocate => 
          advocate.yearsOfExperience >= min && advocate.yearsOfExperience <= max
        );
      } else {
        filtered = filtered.filter(advocate => advocate.yearsOfExperience >= min);
      }
    }

    if (filters.city) {
      filtered = filtered.filter(advocate => advocate.city === filters.city);
    }

    setAdvocates(filtered);
  }, [filters, allAdvocates]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilters({ degree: '', experience: '', city: '' });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const getFilterOptions = () => {
    const degrees = Array.from(new Set(allAdvocates.map(a => a.degree)));
    const cities = Array.from(new Set(allAdvocates.map(a => a.city)));
    const experience = ['0-2', '3-5', '6-10', '10+'];

    return { degree: degrees, experience, cities };
  };

  const headerSubtitle = searchTerm 
    ? `Searching for "${searchTerm}"` 
    : "Find the right advocate for your needs";

  if (loading && advocates.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading advocates...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <HeroGradient subtitle={headerSubtitle} />
      
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="display-font text-3xl font-bold" style={{ color: "var(--color-text)" }}>
              Solace Advocates
            </h1>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
          
          <div className="ds-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                  Search Advocates
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, city, degree, specialties, or experience..."
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-bg-container)"
                  }}
                />
              </div>
              <button
                onClick={handleResetSearch}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Reset All
              </button>
            </div>
            
            {searchTerm && (
              <div className="mt-4 text-sm" style={{ color: "var(--color-text-subtle)" }}>
                Searching for: <span className="font-medium">{searchTerm}</span>
                <span className="ml-2">
                  ({advocates.length} of {totalAdvocates} advocates)
                </span>
                {loading && advocates.length > 0 && (
                  <span className="ml-2 text-blue-600">Updating results...</span>
                )}
              </div>
            )}
          </div>

          <AdvocateFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            options={getFilterOptions()}
          />

          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advocates.map((advocate, index) => (
                <AdvocateCard key={advocate.id || index} advocate={advocate} />
              ))}
            </div>
          ) : (
            <div className="ds-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Degree
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialties
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {advocates.map((advocate, index) => (
                      <tr key={advocate.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {advocate.firstName} {advocate.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.degree}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {advocate.specialties.map((specialty, specialtyIndex) => (
                              <span
                                key={specialtyIndex}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.yearsOfExperience} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {advocate.phoneNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {advocates.length === 0 && !loading && (
            <div className="text-center py-12 ds-card">
              <p style={{ color: "var(--color-text-subtle)" }}>No advocates found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
