using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Utilidades
{
    public class AlmacenadorAzureStorage : IAlmacenadorArchivos
    {
        private string connectionString;
        public AlmacenadorAzureStorage(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AzureStorage");

        }
        /// <summary>
        /// Subir archivos
        /// </summary>
        /// <param name="contenedor"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<string> GuardarArchivo(string contenedor, IFormFile file)
        {

            var cliente = new BlobContainerClient(connectionString, contenedor);
            //creamos el contenedor en caso de que no exista
            await cliente.CreateIfNotExistsAsync();
            //será publico a nivel de blob
            cliente.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            var extension = Path.GetExtension(file.FileName);
            //para evitar tener colisiones de nombres en azure storage creamos un nuevo
            var archivoNombre = $"{Guid.NewGuid()}{extension}";
            var blob = cliente.GetBlobClient(archivoNombre);
            await blob.UploadAsync(file.OpenReadStream());

            return blob.Uri.ToString();


        }

        public async Task BorrarArchivo(string ruta, string contenedor)
        {
            if (string.IsNullOrEmpty(ruta))
                return;

            var cliente = new BlobContainerClient(connectionString, contenedor);
            //creamos el contenedor en caso de que no exista
            await cliente.CreateIfNotExistsAsync();
            var archivo = Path.GetFileName(ruta);
            var blob = cliente.GetBlobClient(archivo);
            await blob.DeleteIfExistsAsync();


        }

        public async Task<string> EditarArchivo(string ruta, string contenedor, IFormFile archivo)
        {

            await BorrarArchivo(ruta, contenedor);
            return await GuardarArchivo(contenedor, archivo);

        }


    }
}
