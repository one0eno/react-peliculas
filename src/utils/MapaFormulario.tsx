import React from 'react';
import { coordenadasDTO } from './coordenadasDTO';
import Mapa from './Mapa';
import { useFormikContext } from 'formik';
export default function MapaFormulario(props: mapaFormuarioProps) {
  const { values } = useFormikContext<any>();
  const handleClickMapa = (coordenadas: coordenadasDTO) => {
    values[props.campoLat] = coordenadas.lat;
    values[props.campoLng] = coordenadas.lng;
  };
  return (
    <>
      <Mapa coordenadas={props.coordenadas} manejarClickMapa={handleClickMapa} />
    </>
  );
}

interface mapaFormuarioProps {
  coordenadas: coordenadasDTO[];
  campoLat: string;
  campoLng: string;
}

MapaFormulario.defaultProps = {
  coordenadas: [],
};
