using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Entidades
{
    public class Cine
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 75)]
        public string Nombre { get; set; }

        /// <summary>
        /// Representa un punto en el planeta tierra latitud y longitud
        /// </summary>
        public Point Ubicacion { get; set;}

        public List<PeliculasCines> PeliculasCines { get; set; }

        



    }
}
