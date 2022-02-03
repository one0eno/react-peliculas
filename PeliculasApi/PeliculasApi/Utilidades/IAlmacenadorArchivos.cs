using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace PeliculasApi.Utilidades
{
    public interface IAlmacenadorArchivos
    {
        Task BorrarArchivo(string ruta, string contenedor);
        Task<string> EditarArchivo(string ruta, string contenedor, IFormFile archivo);
        Task<string> GuardarArchivo(string contenedor, IFormFile file);
    }
}