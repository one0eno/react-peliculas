using PeliculasApi.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Entidades
{
    public class Genero : IValidatableObject
    {
        public int Id{ get; set; }

        [PrimeraLetraMayuscula]
        [Required(ErrorMessage ="El campo {0} es requerido")]
        [StringLength(maximumLength:50)]
        public string  Nombre { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {

            if (!string.IsNullOrEmpty(Nombre)) {
                var primeraLetra = Nombre[0].ToString();

                if (primeraLetra != primeraLetra.ToUpper())
                {
                    yield return new ValidationResult("la primera letra ha de ser mayuscula", new string[] { nameof(Nombre)});
                }
            }
        }
    }
}
