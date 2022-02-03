using AutoMapper;
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
    [Route("api/actores")]
    [ApiController]
    public class ActorController: ControllerBase
    {
        private readonly ILogger logger;
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedorArchivos = "actores";
        public ActorController(ILogger<ActorController> logger, ApplicationDBContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
        {

            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;


        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreacionDTO actorCreacionDTO)
        {
           var actor = mapper.Map<Actor>(actorCreacionDTO);

           if (actorCreacionDTO.Foto != null)
           {
               actor.Foto = await almacenadorArchivos.GuardarArchivo(contenedorArchivos, actorCreacionDTO.Foto);
           }

           context.Add(actor);
           await context.SaveChangesAsync(); 
           return NoContent();

        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(o => o.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            


            actor = mapper.Map(actorCreacionDTO,actor);
            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await almacenadorArchivos.EditarArchivo(actor.Foto, contenedorArchivos, actorCreacionDTO.Foto );
            }
            await context.SaveChangesAsync();

            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var actor = await context.Actores.AnyAsync(o => o.Id == id);
            if (!actor)
            {
                return NotFound();
            }

            context.Actores.Remove(new Actor { Id = id });
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {

            var queryable = context.Actores.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actores);
      
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(o => o.Id == id);
            if (actor == null)
            {
                return NotFound(); 
            }

          
            return mapper.Map<ActorDTO>(actor);
        }
    }
}
