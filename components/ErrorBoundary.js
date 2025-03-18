import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>문제가 발생했습니다.</h1>
          <p>잠시 후 다시 시도해 주세요.</p>
          <button onClick={this.handleRetry}>재시작</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
