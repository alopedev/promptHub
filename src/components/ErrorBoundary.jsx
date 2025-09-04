import React from 'react';

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Bootcamp-appropriate error handling
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information (in production, send to logging service)
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    // Reset error state and reload
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI with user-friendly error message
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          padding: 'var(--spacing-lg)'
        }}>
          <div 
            className="glass" 
            style={{
              maxWidth: '500px',
              padding: 'var(--spacing-2xl)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>
              ⚠️
            </div>
            <h1 className="text-2xl font-bold mb-md">
              Something went wrong
            </h1>
            <p className="text-secondary mb-lg" style={{ lineHeight: 1.6 }}>
              We apologize for the inconvenience. An unexpected error occurred while loading the application.
            </p>
            
            <div className="flex gap-sm justify-center">
              <button 
                onClick={this.handleReload}
                className="btn btn-primary"
              >
                <span>🔄</span>
                <span>Reload Page</span>
              </button>
            </div>

            {/* Development mode: Show error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: 'var(--spacing-lg)', 
                textAlign: 'left',
                backgroundColor: 'var(--bg-secondary)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: 'var(--spacing-sm)' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
