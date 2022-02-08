import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { coordenadasDTO } from './coordenadasDTO';
import { useState } from 'react';
interface mapaProps {
  height: string;
  coordenadas: coordenadasDTO[];
  manejarClickMapa(coordenadas: coordenadasDTO): void;
  soloLectura: boolean;
}
Mapa.defaultProps = {
  height: '500px',
  soloLectura: false,
  manejarClickMapa: () => {},
};

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps) {
  const [coordenadas, setCoordenadas] = useState<coordenadasDTO[]>(props.coordenadas);
  return (
    <>
      <MapContainer center={[40.988825, -3.638218]} zoom={14} style={{ height: props.height }}>
        <TileLayer attribution='React Peliculas' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {props.soloLectura ? null : (
          <ClickMapa
            setPunto={(coordenadas) => {
              setCoordenadas([coordenadas]);
              props.manejarClickMapa(coordenadas);
            }}
          />
        )}

        {coordenadas.map((coordenada) => (
          <Marcador key={coordenada.lat + coordenada.lng} {...coordenada} />
        ))}
      </MapContainer>
    </>
  );
}

function ClickMapa(props: clickMapaProps) {
  useMapEvent('click', (e) => {
    props.setPunto({ lat: e.latlng.lat, lng: e.latlng.lng, nombre: '' });
  });
  return null;
}

function Marcador(props: coordenadasDTO) {
  return <Marker position={[props.lat, props.lng]}>{props.nombre ? <Popup>{props.nombre}</Popup> : null}</Marker>;
}

interface clickMapaProps {
  setPunto(coordenadas: coordenadasDTO): void;
}
