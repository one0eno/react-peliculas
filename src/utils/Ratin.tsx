import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Rating.css';
import { urlRating } from './endpoints';
import AutenticacionContext from '../Auth/AutenticacionContext';
import Swal from 'sweetalert2';
export default function Rating(props: ratingProps) {
  const { claims } = useContext(AutenticacionContext);

  const [maximoValorArr, setMaximoVarlorArr] = useState<number[]>([]);
  const [valorSeleccionado, setValorSeleccionado] = useState<number>(0);

  const manejarMouseOver = (voto: number) => {
    setValorSeleccionado(voto);
  };

  const manejarClick = (voto: number) => {
    if (claims.length === 0) {
      Swal.fire({ title: 'Error', text: 'Debes loguearte para votar', icon: 'error' });
      return;
    }
    setValorSeleccionado(voto);
    props.onChange(voto);
  };

  useEffect(() => {
    setMaximoVarlorArr(Array(props.maximoValor).fill(0));
    setValorSeleccionado(props.valorSeleccionado);
  }, [props.maximoValor]);

  return (
    <>
      {maximoValorArr.map((valor, indice) => {
        return (
          <>
            <FontAwesomeIcon
              icon={faStar}
              key={indice}
              //   color={valorSeleccionado >= indice + 1 ? 'red' : 'gray'}
              className={`fa-lg pointer ${valorSeleccionado >= indice + 1 ? 'check' : null}`}
              onMouseOver={() => manejarMouseOver(indice + 1)}
              onClick={() => manejarClick(indice + 1)}
            />
          </>
        );
      })}
    </>
  );
}

interface ratingProps {
  maximoValor: number;
  valorSeleccionado: number;
  onChange(voto: number): void;
}
