using PeliculasApi.DTO;
using PeliculasApi.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NetTopologySuite.Geometries;

namespace PeliculasApi.Utilidades
{
    public class AutomapperProfiles:Profile
    {
        public AutomapperProfiles(GeometryFactory  geometryFactory )
        {
            /*Mapeamos genero a generoDTO y con ReverseMap() mapeamos además de generoDTO a genero*/
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<GeneroCreacionDTO, Genero>().ReverseMap();
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreacionDTO, Actor>()
                .ForMember(x => x.Foto, options => options.Ignore());


            CreateMap<CineCreacionDTO, Cine>()
                .ForMember(x => x.Ubicacion, x => x.MapFrom(dto => geometryFactory.CreatePoint(new Coordinate(dto.Longitud, dto.Latitud))));
            CreateMap<Cine, CineDTO>()
                 .ForMember(x => x.Latitud, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
                 .ForMember(x => x.Longitud, dto => dto.MapFrom(campo => campo.Ubicacion.X));

            CreateMap<PeliculaCreacionDTO, Pelicula>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.PeliculasGeneros, options => options.MapFrom(MapearPeliculasGenero))
                .ForMember(x => x.PeliculasCines, options => options.MapFrom(MapearPeliculasCines))
                .ForMember(x => x.PeliculasActores, options => options.MapFrom(MapearPeliculasActores));

            CreateMap<Pelicula, PeliculaDTO>()
                .ForMember(x => x.Generos, options => options.MapFrom(MapearGeneroDTO))
                .ForMember(x => x.Actores, options => options.MapFrom(MapearActoresDTO))
                .ForMember(X => X.Cines , options => options.MapFrom(Mapearcinesdto));

            CreateMap<RatingDTO, Rating>();
           


        }


        private List<CineDTO> Mapearcinesdto(Pelicula pelicula, PeliculaDTO peliculadto)
        {
            var resultado = new List<CineDTO>();

            if (pelicula.PeliculasCines == null)
                return resultado;
            foreach (var cine in pelicula.PeliculasCines)
            {
                resultado.Add(new CineDTO()
                {
                    Id = cine.Cine.Id,
                    Latitud = cine.Cine.Ubicacion.Coordinate.Y,
                    Longitud = cine.Cine.Ubicacion.Coordinate.X,
                    Nombre = cine.Cine.Nombre
                });
            }

            return resultado;

         }
        private List<PeliculaActorDTO> MapearActoresDTO(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var resultado = new List<PeliculaActorDTO>();
            
            if (pelicula.PeliculasActores == null)
                return resultado;

            foreach (var actor in pelicula.PeliculasActores)
            {
                resultado.Add(new PeliculaActorDTO()
                {
                    Id = actor.Actor.Id,
                    Orden = actor.Orden,
                    Personaje = actor.Personaje,
                    Foto = actor.Actor.Foto,
                    Nombre = actor.Actor.Nombre
                });
            }

            return resultado;
        }
        private List<GeneroDTO> MapearGeneroDTO(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var resultado = new List<GeneroDTO>();

            if (pelicula.PeliculasGeneros == null)
                return resultado;

            foreach (var genero in pelicula.PeliculasGeneros)
            {
                resultado.Add(new GeneroDTO() { id = genero.GeneroId, Nombre = genero.Genero.Nombre });
            }

            return resultado;
        }
        private List<PeliculasGeneros> MapearPeliculasGenero(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasGeneros>();

            if (peliculaCreacionDTO.GenerosIds == null)
            {
                return resultado;
            }

            foreach (var id in peliculaCreacionDTO.GenerosIds)
            {
                resultado.Add(new PeliculasGeneros() { GeneroId = id });
            }     
            return resultado;

        }

        private List<PeliculasCines> MapearPeliculasCines(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasCines>();

            if (peliculaCreacionDTO.CinesIds == null)
            {
                return resultado;
            }

            foreach (var id in peliculaCreacionDTO.CinesIds)
            {
                resultado.Add(new PeliculasCines() { CineId = id });
            }
            return resultado;

        }

        private List<PeliculasActores> MapearPeliculasActores(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasActores>();

            if (peliculaCreacionDTO.Actores == null)
            {
                return resultado;
            }
            foreach (var actor in peliculaCreacionDTO.Actores)
            {
                resultado.Add(new PeliculasActores() { ActorId = actor.Id, Personaje = actor.Personaje });
            }

            return resultado;
        }

    }
}
