import React from 'react';
import { actorPeliculaDTO, actorDTO } from './actores.model';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { ReactElement } from 'react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlActores } from '../utils/endpoints';

export default function TypeAheadActores(props: typeAheadActoresProps) {
  // const actores: actorPeliculaDTO[] = [
  //   {
  //     id: 1,
  //     nombre: 'Clint',
  //     personaje: '',
  //     foto: 'https://m.media-amazon.com/images/M/MV5BMTg3MDc0MjY0OV5BMl5BanBnXkFtZTcwNzU1MDAxOA@@._V1_UY317_CR10,0,214,317_AL_.jpg',
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Monica',
  //     personaje: '',
  //     foto: 'https://m.media-amazon.com/images/M/MV5BMTI2MzM5Njk1OF5BMl5BanBnXkFtZTYwMjA5OTgz._V1_UY317_CR4,0,214,317_AL_.jpg',
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Tarantino',
  //     personaje: '',
  //     foto: 'https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_UX214_CR0,0,214,317_AL_.jpg',
  //   },
  // ];

  const [opciones, setOpciones] = useState<actorPeliculaDTO[]>([]);
  const [cargando, setCargando] = useState(false);
  const [elementoArrastrado, setElementoArrastrado] = useState<actorPeliculaDTO | undefined>(undefined);

  const manejarDragStart = (actor: actorPeliculaDTO) => {
    setElementoArrastrado(actor);
  };
  const manejarDragOver = (actor: actorPeliculaDTO) => {
    if (!elementoArrastrado) return;

    if (actor.id !== elementoArrastrado.id) {
      const elementoArrastradoIndice = props.actores.findIndex((o) => o.id === elementoArrastrado.id);
      const actorIndice = props.actores.findIndex((o) => o.id === actor.id);

      const actores = [...props.actores];
      actores[actorIndice] = elementoArrastrado;
      actores[elementoArrastradoIndice] = actor;

      props.onAdd(actores);
    }
  };
  const seleccion: actorPeliculaDTO[] = [];

  const manejarBusqueda = (query: string) => {
    setCargando(true);
    //query es lo que el usuario ha escrito en el typeahead (el campo de buscqueda de actores)
    axios.get(`${urlActores}/buscarPorNombre/${query}`).then((respuesta: AxiosResponse<actorPeliculaDTO[]>) => {
      setOpciones(respuesta.data);
      setCargando(false);
    });
  };
  return (
    <>
      <label>Actores</label>
      <AsyncTypeahead
        id='typeahead'
        isLoading={cargando}
        onSearch={manejarBusqueda}
        onChange={(actores) => {
          if (props.actores.findIndex((x) => x.id === actores[0].id) === -1) {
            props.onAdd([...props.actores, actores[0]]);
          }
        }}
        options={opciones}
        labelKey={(actor) => actor.nombre}
        filterBy={() => true}
        minLength={1}
        flip={true}
        selected={seleccion}
        renderMenuItemChildren={(actor) => (
          <>
            <div key={actor.id}>
              <img src={actor.foto} alt='imagen' style={{ width: '64px', marginRight: '10px' }} />
              <span>{actor.nombre}</span>
            </div>
          </>
        )}
      />

      <ul className='list-group'>
        {props.actores.map((actor) => (
          <li
            className='list-group-item list-group-item-action'
            key={actor.id}
            draggable={true}
            onDragStart={() => manejarDragStart(actor)}
            onDragOver={() => manejarDragOver(actor)}
          >
            {props.listadoUI(actor)}
            <span
              className='badge badge-primary badge-pill pointer'
              style={{ marginLeft: '0.5rem' }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface typeAheadActoresProps {
  actores: actorPeliculaDTO[];
  onAdd(actores: actorPeliculaDTO[]): void;
  listadoUI(actor: actorPeliculaDTO): ReactElement;
  onRemove(actor: actorPeliculaDTO): void;
}
