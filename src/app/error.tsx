'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Please try again.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Try again
          </button>
          
          <div>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Go back to Solace Advocates
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
