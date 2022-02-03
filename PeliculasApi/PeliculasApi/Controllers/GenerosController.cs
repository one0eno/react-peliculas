using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PeliculasApi.DTO;
using PeliculasApi.Entidades;
using PeliculasApi.Filtros;
using PeliculasApi.Utilidades;
//using PeliculasApi.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Controllers
{
    [Route("api/generos")]
    [ApiController]
    public class GenerosController : ControllerBase
    {

        //private readonly IRepositorio repositorio;
        private readonly ILogger logger;
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        public GenerosController(ILogger<GenerosController> logger,
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
        public async Task<ActionResult<List<GeneroDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {

            var queryable = context.Generos.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var generos = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<GeneroDTO>>(generos);


            //logger.LogInformation("vamos a mostrar los géneros");

            //return new  List<Genero> () {

            //    new Genero() { Id = 1, Nombre = "Terror" }

            //};

            //repositorio.ObtenerTodosLosGeneros();
        }

        //[HttpGet("{id:int}/{nombre=Jorge}")]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<GeneroDTO>> Get(int id) {

            var genero = await context.Generos.FirstOrDefaultAsync(x => x.Id == id);
            if (genero == null)
            {
                return NotFound();
            }

            return mapper.Map<GeneroDTO>(genero);



            //throw new NotImplementedException();

            ////if (!ModelState.IsValid)
            ////{
            ////    return BadRequest(ModelState);
            ////}

            //var genero = await repositorio.ObtenerGenero(id);


            //if (genero == null)
            //    return NotFound();

            //// return Ok(genero);
            //return genero;


        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GeneroCreacionDTO generoCreacionDTO) {

            var genero = mapper.Map<Genero>(generoCreacionDTO);
            context.Generos.Add(genero);
            await context.SaveChangesAsync();
            return NoContent();

        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GeneroCreacionDTO generoCreacionDTO) {

            var genero = await context.Generos.FirstOrDefaultAsync(o => o.Id == id);
            if (genero == null)
            {
                return NotFound();
            }

            genero = mapper.Map(generoCreacionDTO, genero);

            //context.Generos.Update(genero);
            await context.SaveChangesAsync();
            return NoContent();

        }
        [HttpDelete("{id:int}")]
        public async  Task<ActionResult> Delete(int id) {

            var genero = await context.Generos.AnyAsync(o => o.Id == id);

            if (!genero)
            {
                return NotFound();
            }

            context.Generos.Remove(new Genero { Id = id});
            await context.SaveChangesAsync();

            return NoContent();
            
        }
    }
}
