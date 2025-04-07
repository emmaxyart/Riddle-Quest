import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm">
          <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-xl sm:rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="text-xl mb-8 text-foreground/80">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
