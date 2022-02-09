using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class RespuestaAtenticacion
    {
       public string Token { get; set; }
       public DateTime Expiracion { get; set; }
    }
}
