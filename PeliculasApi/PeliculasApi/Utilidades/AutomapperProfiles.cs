using PeliculasApi.DTO;
using PeliculasApi.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
namespace PeliculasApi.Utilidades
{
    public class AutomapperProfiles:Profile
    {
        public AutomapperProfiles()
        {
            /*Mapeamos genero a generoDTO y con ReverseMap() mapeamos además de generoDTO a genero*/
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<GeneroCreacionDTO, Genero>().ReverseMap();
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreacionDTO, Actor>()
                .ForMember(x => x.Foto, options => options.Ignore());
        }
        
    }
}
