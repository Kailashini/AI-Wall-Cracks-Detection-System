function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🏢</div>

        <div className="logo-text">
          <h2>AI Crack</h2>
          <span>Structural Analysis</span>
        </div>
      </div>

      <nav>
        <a className="active" href="#dashboard">
          <span>📊</span>
          Dashboard
        </a>

        <a href="#upload">
          <span>📷</span>
          Upload Image
        </a>

        <a href="#analysis">
          <span>🤖</span>
          AI Analysis
        </a>

        <a href="#cost">
          <span>💰</span>
          Cost Estimation
        </a>

        <a href="#history">
          <span>📋</span>
          History
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;