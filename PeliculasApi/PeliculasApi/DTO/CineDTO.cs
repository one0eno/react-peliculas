﻿using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class CineDTO
    {

        public int Id { get; set; }
        
        public string Nombre { get; set; }

        public double Latitud { get; set; }
        public double Longitud { get; set; }

    }
}
