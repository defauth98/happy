import React from 'react';

import Sidebar from '../components/Sidebar';
import OrphanageItem from '../components/OrphanageItem';
import '../styles/pages/dashboard.css';

function Dashboard() {
  return (
    <div id="dashboard">
      <Sidebar />
      <main>
        <div className="header">
          <h1>Orfanatos Cadastrados</h1>
          <p>2 orfanatos</p>
        </div>

        <div className="orphanages">
          <OrphanageItem />
          <OrphanageItem />
          <OrphanageItem />
          <OrphanageItem />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
