import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
          <div className="text-center p-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4 text-left overflow-auto max-h-60">
              <p className="text-red-400 mb-2">Error: {this.state.error?.message}</p>
              {this.state.errorInfo && (
                <pre className="text-sm text-gray-400 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
            <div className="space-x-4">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-[#915EFF] rounded-md hover:bg-[#7b4ed1] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 