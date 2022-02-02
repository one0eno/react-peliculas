using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.DTO
{
    public class PaginacionDTO
    {
        public int Pagina { get; set; } = 1;

        private int recordsPorPagina = 10;
        private readonly int cantidadMaximaRecordsPagina = 50;

        public int RecordsPorPagina
        {
            get { return recordsPorPagina; }
            set {

                recordsPorPagina = (value > cantidadMaximaRecordsPagina ? cantidadMaximaRecordsPagina : value);
            }
        }
    }
}
