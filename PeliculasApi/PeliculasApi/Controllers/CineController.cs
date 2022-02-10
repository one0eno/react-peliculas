using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PeliculasApi.DTO;
using PeliculasApi.Entidades;
using PeliculasApi.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Controllers
{
    [Route("api/cines")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
    public class CineController:ControllerBase
    {
        private readonly ILogger logger;
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        public CineController(ILogger<CineController> logger,
            ApplicationDBContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;

        }

        [HttpGet]
        ////[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[ServiceFilter(typeof(MiFiltroDeAccion))]
        public async Task<ActionResult<List<CineDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {

            var queryable = context.Cines.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var cines = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<CineDTO>>(cines);


        }

        [HttpGet("CinesReserva")]
        [AllowAnonymous]
        public async Task<ActionResult<List<CineDTO>>> CinesReserva([FromQuery] PaginacionDTO paginacionDTO)
        {

            var queryable = context.Cines.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var cines = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<CineDTO>>(cines);


        }

        //[HttpGet("{id:int}/{nombre=Jorge}")]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CineDTO>> Get(int id)
        {

            var cine = await context.Cines.FirstOrDefaultAsync(x => x.Id == id);
            if (cine == null)
            {
                return NotFound();
            }

            return mapper.Map<CineDTO>(cine);




        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {

            var cine = mapper.Map<Cine>(cineCreacionDTO);
            context.Add(cine);
            await context.SaveChangesAsync();
            return NoContent();

        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CineCreacionDTO cineCreacionDTO)
        {

            var cine = await context.Cines.FirstOrDefaultAsync(o => o.Id == id);
            if (cine == null)
            {
                return NotFound();
            }

            cine = mapper.Map(cineCreacionDTO, cine);
            await context.SaveChangesAsync();
            return NoContent();

        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var cine = await context.Cines.AnyAsync(o => o.Id == id);

            if (!cine)
            {
                return NotFound();
            }

            context.Cines.Remove(new Cine { Id = id });
            await context.SaveChangesAsync();

            return NoContent();

        }
    }
}
