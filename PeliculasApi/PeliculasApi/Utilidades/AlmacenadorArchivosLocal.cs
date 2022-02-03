using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Utilidades
{
    public class AlmacenadorArchivosLocal:IAlmacenadorArchivos
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AlmacenadorArchivosLocal(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }

        public Task BorrarArchivo(string ruta, string contenedor)
        {
            if (string.IsNullOrEmpty(ruta))
                return Task.CompletedTask;

            var nombreArchivos = Path.GetFileName(ruta);
            var directorioArchivo = Path.Combine(env.WebRootPath, contenedor, nombreArchivos);

            if (File.Exists(directorioArchivo))
            {
                File.Delete(directorioArchivo);
            }

            return Task.CompletedTask;
        }

        public async Task<string> EditarArchivo(string ruta, string contenedor, IFormFile archivo)
        {
            await BorrarArchivo(ruta, contenedor);
            return await GuardarArchivo(contenedor, archivo);
        }

        public async Task<string> GuardarArchivo(string contenedor, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName) ;
            var nombreArchivo = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(env.WebRootPath, contenedor);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string ruta = Path.Combine(folder, nombreArchivo);

            using (var menoryStream = new MemoryStream()) 
            {

                await file.CopyToAsync(menoryStream);
                var contenido = menoryStream.ToArray();
                await File.WriteAllBytesAsync(ruta, contenido);

            }

            var urlActual = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";

            var rutaParaDb =Path.Combine(urlActual,contenedor,nombreArchivo).Replace("\\", "/") ;

            return rutaParaDb;
        }
    }
}
