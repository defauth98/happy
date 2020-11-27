import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import PendingOrphanageItem from '../components/PendingOrphanageItem';
import '../styles/pages/pending-orphanages.css';
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
    api.get('pending').then((response) => setOrphanages(response.data));
  }

  return (
    <div id="dashboard">
      <Sidebar />
      <main>
        <div className="header">
          <h1>Cadastro pendentes</h1>
          <p>2 orfanatos</p>
        </div>

        <div className="orphanages">
          {orphanages &&
            orphanages.map((orphanage: OrphanageItemProps) => (
              <PendingOrphanageItem
                key={String(orphanage.id)}
                orphanage={orphanage}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
