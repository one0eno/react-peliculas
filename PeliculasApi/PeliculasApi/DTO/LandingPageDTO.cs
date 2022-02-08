using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class LandingPageDTO
    {
        public List<PeliculaDTO> EnCartelera { get; set; }
        public List<PeliculaDTO> ProximosEstrenos { get; set; }

    }
}
