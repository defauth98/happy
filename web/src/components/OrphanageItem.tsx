import React from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import editIcon from '../images/edit.svg';
import trashIcon from '../images/trash.svg';

import '../styles/components/orphanage-item.css';
import api from '../services/api';

interface OrphanageItem {
  orphanage: {
    id: number;

    latitude: number;
    longitude: number;
    name: String;
  };
  updateOrphanages(): void;
}

const OrphanageItem: React.FC<OrphanageItem> = ({
  orphanage,
  updateOrphanages,
}) => {
  function handleRemoveOrphanage() {
    api.delete(`orphanages/${orphanage.id}`).then(() => {
      alert('deletado com sucesso');
      updateOrphanages();
    });
  }

  return (
    <div id="orphanage-item">
      <div className="map-container">
        <Map
          center={[orphanage.latitude, orphanage.longitude]}
          zoom={16}
          style={{ width: '100%', height: '280px' }}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGVmYXV0aCIsImEiOiJja2c2cmJ2ZTMwMDV1MnBud3kzOWdnZnRtIn0.OcdJMfk9VrbmYUTKAurKWw`}
          />
          <Marker
            interactive={false}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          />
        </Map>
      </div>
      <div className="orphanage-info">
        <h1>{orphanage.name}</h1>

        <div className="buttons-container">
          <div className="edit-button">
            <button>
              <img src={editIcon} alt="Editar" />
            </button>
          </div>
          <div className="trash-button">
            <button onClick={handleRemoveOrphanage}>
              <img src={trashIcon} alt="Apagar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageItem;
