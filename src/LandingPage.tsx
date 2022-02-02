import { useEffect, useState } from 'react';
import { pelicula, landingPageDTO } from './peliculas/peliculas.model';
import ListadoPeliculas from './peliculas/ListadoPeliculas';

export default function LandingPage() {
  const peliculaPrueba: pelicula[] = [
    {
      id: 1,
      titulo: 'el padrino',
      poster: 'https://i.ytimg.com/vi/3TERjQkdqYY/maxresdefault.jpg',
    },
    {
      id: 2,
      titulo: 'el padrino',
      poster: 'https://www.sonypictures.es/sites/default/files/2021-11/KEY_ART_1400x2100-2.jpg',
    },
    {
      id: 3,
      titulo: 'el padrino',
      poster: 'https://www.sonypictures.es/sites/default/files/2021-11/KEY_ART_1400x2100-2.jpg',
    },
    {
      id: 4,
      titulo: 'el padrino',
      poster: 'https://www.sonypictures.es/sites/default/files/2021-11/KEY_ART_1400x2100-2.jpg',
    },
  ];

  const proximosEstrenos: pelicula[] = [
    {
      id: 1,
      titulo: 'el padrino',
      poster: 'https://www.sonypictures.es/sites/default/files/2021-11/KEY_ART_1400x2100-2.jpg',
    },
    {
      id: 2,
      titulo: 'el padrino',
      poster: 'https://www.sonypictures.es/sites/default/files/2021-11/KEY_ART_1400x2100-2.jpg',
    },
  ];

  const [peliculas, setPeliculas] = useState<landingPageDTO>();

  useEffect(() => {
    const tiemOut = setTimeout(() => {
      setPeliculas({ encartelera: peliculaPrueba, proximosestrenos: proximosEstrenos });
    }, 1000);

    return () => clearTimeout(tiemOut);
  }, []);
  return (
    <>
      <h3>Peliculas en cartelera</h3>
      <ListadoPeliculas peliculas={peliculas?.encartelera}></ListadoPeliculas>
      <h3>Proximos estrenos</h3>
      <ListadoPeliculas peliculas={peliculas?.proximosestrenos}></ListadoPeliculas>
    </>
  );
}
