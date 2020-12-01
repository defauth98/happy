import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import OrphanageItem from '../components/OrphanageItem';
import '../styles/pages/dashboard.css';
import api from '../services/api';

interface OrphanageItemProps {
  id: number;

  latitude: number;
  longitude: number;
  name: string;
}

function Dashboard() {
  const [orphanages, setOrphanages] = useState([]);

  useEffect(() => {
    updateOrphanages();
  }, []);

  function updateOrphanages() {
    api.get('orphanages').then((response) => setOrphanages(response.data));
  }

  return (
    <div id="dashboard">
      <Sidebar />
      <main>
        <div className="header">
          <h1 className="title">Orfanatos Cadastrados</h1>
          <p className="right-title"> 2 orfanatos</p>
        </div>

        <div className="orphanages">
          {orphanages &&
            orphanages.map((orphanage: OrphanageItemProps) => (
              <OrphanageItem
                key={String(orphanage.id)}
                orphanage={orphanage}
                updateOrphanages={updateOrphanages}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
