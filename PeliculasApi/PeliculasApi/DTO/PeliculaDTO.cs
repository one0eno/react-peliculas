﻿using PeliculasApi.Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class PeliculaDTO
    {

        public int Id { get; set; }
        public string Titulo { get; set; }

        public string Resumen { get; set; }

        public bool EnCines { get; set; }

        public string Trailer { get; set; }

        public DateTime FechaLanzamiento { get; set; }

        public string Poster { get; set; }

        public int VotoUsuario { get; set; }

        public double PromedioVoto { get; set; }

        //Propiedades de navegacion
        public List<PeliculaActorDTO> Actores{ get; set; }
        public List<GeneroDTO> Generos{ get; set; }

        public List<CineDTO> Cines{ get; set; }
    }
}
