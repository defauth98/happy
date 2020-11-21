import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Input from '../components/Input';

import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiX, FiPlus } from 'react-icons/fi';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';

import '../styles/pages/edit-orphanage.css';

interface Params {
  id: string;
}

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

function EditOrphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>({} as Orphanage);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState([]);

  const params = useParams<Params>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);

      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setName(response.data.name);
      setAbout(response.data.about);
      setInstructions(response.data.instructions);
      setOpenOnWeekends(response.data.open_on_weekends);
      setOpeningHours(response.data.opening_hours);
      setImages(response.data.images);
    });
  }, [params.id]);

  return (
    <div id="edit-orphanage">
      <Sidebar />

      <main>
        <h1>Editar perfil de {orphanage.name} </h1>

        <div id="orphanage">
          <h2>Dados</h2>

          {orphanage.latitude && orphanage.longitude && (
            <div className="map-container">
              <Map
                center={[Number(latitude), Number(longitude)]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={true}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={true}
                  icon={mapIcon}
                  position={[Number(latitude), Number(longitude)]}
                />
              </Map>

              <h2>Clique no mapa para alterar a localização</h2>
            </div>
          )}

          <Input label="Nome" value={orphanage.name} setInput={() => {}} />
          <Input label="Sobre" value={orphanage.about} setInput={() => {}} />

          {orphanage.images && (
            <div className="images">
              <h2>Fotos</h2>
              <div className="images-grid">
                {orphanage.images.map((image) => (
                  <div id="image" key={image.id}>
                    <button className="delete">
                      <FiX color="#FF669D" size="20px" />
                    </button>
                    <img src={image.url} alt={orphanage.name} />
                  </div>
                ))}
                <button id="add">
                  <FiPlus color="#15B6D6" size="20px" />
                </button>
              </div>
            </div>
          )}

          <h2>Visitação</h2>
          <Input
            label="Instruções"
            value={orphanage.instructions}
            setInput={() => {}}
          />
          <Input
            label="Horário das visitas"
            value={orphanage.opening_hours}
            setInput={() => {}}
          />

          <div id="open-on-weekends">
            <h3>Atende fim de semana?</h3>

            <div id="buttons">
              <button
                className={`button ${open_on_weekends ? 'active' : ''} `}
                id="yes"
                onClick={() => setOpenOnWeekends(true)}
              >
                Sim
              </button>
              <button
                className={`button ${!open_on_weekends ? 'active' : ''} `}
                id="no"
                onClick={() => setOpenOnWeekends(false)}
              >
                Não
              </button>
            </div>
          </div>
          <button className="button-confirm">Confirmar</button>
        </div>
      </main>
    </div>
  );
}

export default EditOrphanage;
