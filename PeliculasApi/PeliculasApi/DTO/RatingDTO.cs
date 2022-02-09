using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class RatingDTO
    {

        [Range(1, 5)]
        public int Puntuacion { get; set; }
        public int PeliculaId { get; set; }
    
    }
}
