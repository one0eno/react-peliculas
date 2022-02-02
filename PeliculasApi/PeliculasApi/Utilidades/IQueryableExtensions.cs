﻿using PeliculasApi.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Utilidades
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginar<T>(this IQueryable<T> quryable, PaginacionDTO paginacionDTO)
        {
            return quryable.
                Skip((paginacionDTO.Pagina - 1) * paginacionDTO.RecordsPorPagina).
                Take(paginacionDTO.RecordsPorPagina);
                
        }
    }
}
