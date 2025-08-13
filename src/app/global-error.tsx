'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Critical Error
              </h2>
              <p className="text-gray-600 mb-8">
                A critical error occurred. Please refresh the page or contact support.
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
                <button
                  onClick={() => window.location.href = '/'}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Go back to Solace Advocates
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
