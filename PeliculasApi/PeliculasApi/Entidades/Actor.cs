using PeliculasApi.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Entidades
{
    public class Actor
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 200)]
        public string Nombre { get; set; }

        public string Biografia { get; set; }

        public DateTime FechaNacimento { get; set; }

        public string Foto { get; set; }

        //Propiedades de navaegacion

        public List<PeliculasActores> PeliculasActores { get; set; }

    }
}
