import React from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import arrowIcon from '../images/arrow.svg';

import '../styles/components/pending-orphanage-item.css';
import { useHistory } from 'react-router-dom';

interface OrphanageItem {
  orphanage: {
    id: number;

    latitude: number;
    longitude: number;
    name: String;
  };
}

const OrphanageItem: React.FC<OrphanageItem> = ({ orphanage }) => {
  const history = useHistory();

  function handleViewOrphanage() {
    history.push(`accept/${orphanage.id}`);
  }

  return (
    <div id="orphanage-pending-item">
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
          <div className="arrow-button">
            <button onClick={handleViewOrphanage}>
              <img src={arrowIcon} alt="Visualizar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageItem;
