import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-2 rounded-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">Oops! Something went wrong.</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-light-blue-600 text-white rounded-md hover:bg-light-blue-700 transition duration-150 ease-in-out"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;