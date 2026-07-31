function Dashboard({ dashboard }) {
  return (
    <section id="dashboard">
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <div>
            <h4>Total Analysis</h4>
            <h2>{dashboard?.total || 0}</h2>
          </div>
        </div>


        <div className="dashboard-card low">
          <div className="card-icon">🟢</div>
          <div>
            <h4>Low Severity</h4>
            <h2>{dashboard?.low || 0}</h2>
          </div>
        </div>


        <div className="dashboard-card medium">
          <div className="card-icon">🟠</div>
          <div>
            <h4>Medium Severity</h4>
            <h2>{dashboard?.medium || 0}</h2>
          </div>
        </div>


        <div className="dashboard-card high">
          <div className="card-icon">🔴</div>
          <div>
            <h4>High Severity</h4>
            <h2>{dashboard?.high || 0}</h2>
          </div>
        </div>


      </div>
    </section>
  );
}

export default Dashboard;