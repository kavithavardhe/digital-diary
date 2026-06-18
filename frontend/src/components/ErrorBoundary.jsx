import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="auth-page">
          <div className="auth-card glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
            <h1 className="auth-title">Something went wrong</h1>
            <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
              An unexpected error occurred. Please try again.
            </p>
            <Link
              to="/entries"
              className="btn btn-primary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Go to Journal
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
