﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class ActorDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public string Biografia { get; set; }

        public DateTime FechaNacimento { get; set; }

        public string Foto { get; set; }
    }
}
