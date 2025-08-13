"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

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

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAdvocates, setTotalAdvocates] = useState(0);
  
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
        setTotalAdvocates(jsonResponse.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
  };

  if (loading && advocates.length === 0) {
    return (
      <main style={{ margin: "24px" }}>
        <div>Loading advocates...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ margin: "24px" }}>
        <div style={{ color: "red" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleSearchChange} />
        <button onClick={handleResetSearch}>Reset Search</button>
      </div>
      
      {searchTerm && (
        <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
          Found {advocates.length} of {totalAdvocates} advocates
          {loading && advocates.length > 0 && (
            <span style={{ marginLeft: "8px", color: "#3b82f6" }}>Updating results...</span>
          )}
        </div>
      )}
      
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => (
            <tr key={advocate.id || index}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s, specialtyIndex) => (
                  <div key={specialtyIndex}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
