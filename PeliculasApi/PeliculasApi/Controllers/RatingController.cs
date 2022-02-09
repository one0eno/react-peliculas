using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PeliculasApi.DTO;
using PeliculasApi.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Controllers
{

    [Route("api/peliculas")]
    [ApiController]
    public class RatingController:ControllerBase
    {

        private readonly ILogger logger;
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        private readonly UserManager<IdentityUser> userManager;
        public RatingController(UserManager<IdentityUser> userManager, ILogger<RatingController> logger, ApplicationDBContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        /// <summary>
        /// Usamos AuthenticationSchemes que está configurado en startup.cs
        /// solo usuarios autenticados pueden ejecutgar el endpoint 
        /// </summary>
        /// <param name="ratingDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
           var email = HttpContext.User.Claims.FirstOrDefault(o => o.Type == "email").Value;
           var usuario = await userManager.FindByEmailAsync(email);
           var usuarioId = usuario.Id;

           var ratingActual = await context.Ratings.FirstOrDefaultAsync(x => x.UsuarioId == usuarioId && x.PeliculaId == ratingDTO.PeliculaId);

            //No ha votado  por la pelicula
            if (ratingActual == null)
            {
                var rating = new Rating();
                rating.PeliculaId = ratingDTO.PeliculaId;
                rating.Puntuacion = ratingDTO.Puntuacion;
                rating.UsuarioId  = usuarioId;

                context.Add(rating);   
            }
            //Ya ha votado aún
            else 
            {
                ratingActual.Puntuacion  = ratingDTO.Puntuacion;
            }
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
