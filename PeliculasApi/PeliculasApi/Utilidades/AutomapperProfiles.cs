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


        }
        
    }
}
