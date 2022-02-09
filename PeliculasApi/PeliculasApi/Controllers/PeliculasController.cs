using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    [Route("api/peliculas")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PeliculasController : ControllerBase
    {

        //private readonly IRepositorio repositorio;
        private readonly ILogger logger;
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedorArchivos = "peliculas";
        private readonly UserManager<IdentityUser> userManager;
        public PeliculasController(ILogger<PeliculasController> logger,
            ApplicationDBContext context,
            IMapper mapper, 
            IAlmacenadorArchivos almacenadorArchivos,
            UserManager<IdentityUser> userManager)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;
            this.userManager = userManager;
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = mapper.Map<Pelicula>(peliculaCreacionDTO);

            if (peliculaCreacionDTO.Poster != null)
            {
                pelicula.Poster = await almacenadorArchivos.GuardarArchivo(contenedorArchivos, peliculaCreacionDTO.Poster);
            }

            EscribirOrdenActores(pelicula);

            context.Add(pelicula);
            await context.SaveChangesAsync();
            return NoContent();

        }

        [AllowAnonymous]
        private void EscribirOrdenActores(Pelicula pelicula) {

            if (pelicula.PeliculasActores != null)
            {
                for (int i = 0; i < pelicula.PeliculasActores.Count; i++)
                {
                    pelicula.PeliculasActores[i].Orden = i;
                }
            }

        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<PeliculasPostGetDTO>> PostGet()
        {


            var cines = await context.Cines.ToListAsync();
            var generos = await context.Generos.ToListAsync();

            var cinesDTO = mapper.Map<List<CineDTO>>(cines);
            var generosDTO = mapper.Map<List<GeneroDTO>>(generos);


            return new PeliculasPostGetDTO() { Cines = cinesDTO, Generos = generosDTO };
        }


        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<PeliculaDTO>> Get(int id)
        {


            var pelicula = await context.Peliculas
                .Include(x => x.PeliculasGeneros).ThenInclude(x => x.Genero)
                .Include(x => x.PeliculasCines).ThenInclude(x => x.Cine)
                .Include(x => x.PeliculasActores).ThenInclude(x => x.Actor)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula == null)
                return NotFound();

            var promedioVoto = 0.0;
            var votoUsuario = 0;

            if (await context.Ratings.AnyAsync(x => x.PeliculaId == pelicula.Id))
            {
                promedioVoto = await context.Ratings.Where(x => x.PeliculaId == id).AverageAsync(x => x.Puntuacion);


                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;

                    var usuario = await userManager.FindByEmailAsync(email);
                    var usuarioId = usuario.Id;

                    var ratingDB = await context.Ratings
                        .FirstOrDefaultAsync(x => x.UsuarioId == usuarioId && x.PeliculaId == id);

                    if (ratingDB != null)
                    {
                        votoUsuario = ratingDB.Puntuacion;
                    }
                }
            }


            var peliculaDto = mapper.Map<PeliculaDTO>(pelicula);
            peliculaDto.PromedioVoto = promedioVoto;
            peliculaDto.VotoUsuario = votoUsuario;
            peliculaDto.Actores = peliculaDto.Actores.OrderBy(x => x.Orden).ToList();
            return peliculaDto;
        }

        [HttpGet()]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get() {

            var top = 6;
            var hoy = DateTime.Today;

            var proximosEstrenos = await context.Peliculas.Where(o => o.FechaLanzamiento > hoy)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(top)
                .ToListAsync();

            var enCines = await context.Peliculas.Where(o => o.EnCines == true)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(top)
                .ToListAsync();


            LandingPageDTO resultado = new LandingPageDTO();
            resultado.ProximosEstrenos = mapper.Map<List<PeliculaDTO>>(proximosEstrenos);
            resultado.EnCartelera = mapper.Map<List<PeliculaDTO>>(enCines);

            return resultado;
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<PeliculasPutGetDTO>> PutGet(int Id)
        {
            var peliculaActionResult = await Get(Id);

            if (peliculaActionResult.Result is NotFoundResult) return NotFound();

            var pelicula = peliculaActionResult.Value;

            var generosSeleccionadosIds = pelicula.Generos.Select(o => o.id).ToList();
            var generosNoSeleccionados = await context.Generos
                .Where(x => !generosSeleccionadosIds.Contains(x.Id))
                .ToListAsync();

            var cinesSeleccionadosIds = pelicula.Cines.Select(o => o.Id).ToList();
            var cinesNoSeleccionados = await context.Cines
                .Where(x => !cinesSeleccionadosIds.Contains(x.Id))
                .ToListAsync();

            var generosNoSeleccionadosDTO = mapper.Map<List<GeneroDTO>>(generosNoSeleccionados);
            var cinesNoSeleccionadosDTO = mapper.Map<List<CineDTO>>(cinesNoSeleccionados);

            var respuesta = new PeliculasPutGetDTO();

            respuesta.Pelicula = pelicula;

            respuesta.GenerosSeleccionados = pelicula.Generos;
            respuesta.GenerosNoSeleccionados = generosNoSeleccionadosDTO;
            respuesta.CinesSeleccionados = pelicula.Cines;
            respuesta.CinesNoSeleccionados = cinesNoSeleccionadosDTO;
            respuesta.Actores = pelicula.Actores;

            return respuesta;

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            try
            {
                var pelicula = await context.Peliculas
               .Include(x => x.PeliculasGeneros)
               .Include(x => x.PeliculasCines)
               .Include(x => x.PeliculasActores)
               .FirstOrDefaultAsync(o => o.Id == id);

                if (pelicula == null)
                {
                    return NotFound();
                }

                pelicula = mapper.Map(peliculaCreacionDTO, pelicula);

                if (peliculaCreacionDTO.Poster != null)
                {
                    pelicula.Poster = await almacenadorArchivos.EditarArchivo(pelicula.Poster, contenedorArchivos, peliculaCreacionDTO.Poster);
                }

                EscribirOrdenActores(pelicula);
                //context.Entry(pelicula).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }


            return NoContent();

        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var pelicula = context.Peliculas.FirstOrDefault(o => o.Id == id);

            if (pelicula == null)
                return NotFound();

            context.Peliculas.Remove(pelicula);
            
            await almacenadorArchivos.BorrarArchivo(pelicula.Poster, contenedorArchivos);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("filtrar")]
        [AllowAnonymous]
        public async Task<ActionResult<List<PeliculaDTO>>> Filtrar([FromQuery] PeliculasFiltrarDTO peliculasFiltrarDTO)
        {

            var peliculasQueryable = context.Peliculas.AsQueryable();
            //var peliculasQueryableEstrenos = context.Peliculas.AsQueryable();

            if (!string.IsNullOrWhiteSpace(peliculasFiltrarDTO.Titulo))
                peliculasQueryable = peliculasQueryable.Where(x => x.Titulo.ToUpper().Contains(peliculasFiltrarDTO.Titulo.ToUpper()) );
            if (peliculasFiltrarDTO.EnCines)
                peliculasQueryable =  peliculasQueryable.Where(x => x.EnCines);
            if (peliculasFiltrarDTO.ProximosEstrenos)
            {
                peliculasQueryable = peliculasQueryable.Where(x => x.FechaLanzamiento > DateTime.Now);
                //peliculasQueryableEstrenos = peliculasQueryableEstrenos.Where(x => x.FechaLanzamiento > DateTime.Now);
            }
                
            if (peliculasFiltrarDTO.GeneroId != 0)
            {
                peliculasQueryable =  peliculasQueryable
                    .Where(x => x.PeliculasGeneros.Select(a => a.GeneroId)
                    .Contains(peliculasFiltrarDTO.GeneroId));
            }

            //var mergeQueriables = peliculasQueryable.Concat(peliculasQueryableEstrenos);

            await HttpContext.InsertarParametrosPaginacionEnCabecera(peliculasQueryable);
            var peliculas = await peliculasQueryable.Paginar(peliculasFiltrarDTO.PaginacionDTO).ToListAsync();

            return mapper.Map<List<PeliculaDTO>>(peliculas);
        }
        
        //[HttpPut("{id:int}")]
        //public async Task<ActionResult> Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        //{
        //    var actor = await context.Actores.FirstOrDefaultAsync(o => o.Id == id);
        //    if (actor == null)
        //    {
        //        return NotFound();
        //    }



        //    actor = mapper.Map(actorCreacionDTO, actor);
        //    if (actorCreacionDTO.Foto != null)
        //    {
        //        actor.Foto = await almacenadorArchivos.EditarArchivo(actor.Foto, contenedorArchivos, actorCreacionDTO.Foto);
        //    }
        //    await context.SaveChangesAsync();

        //    return NoContent();


        //}

        //[HttpDelete("{id:int}")]
        //public async Task<ActionResult> Delete(int id)
        //{

        //    var actor = await context.Actores.AnyAsync(o => o.Id == id);
        //    if (!actor)
        //    {
        //        return NotFound();
        //    }

        //    context.Actores.Remove(new Actor { Id = id });
        //    await context.SaveChangesAsync();

        //    return NoContent();
        //}

        //[HttpGet]
        //public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        //{

        //    var queryable = context.Actores.AsQueryable();
        //    await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
        //    var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
        //    return mapper.Map<List<ActorDTO>>(actores);

        //}

        //[HttpGet("{id:int}")]
        //public async Task<ActionResult<ActorDTO>> Get(int id)
        //{
        //    var actor = await context.Actores.FirstOrDefaultAsync(o => o.Id == id);
        //    if (actor == null)
        //    {
        //        return NotFound();
        //    }


        //    return mapper.Map<ActorDTO>(actor);
        //}



    }
}
