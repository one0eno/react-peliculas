using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Filtros
{
    public class MiFiltroDeAccion : IActionFilter
    {
        public ILogger<MiFiltroDeAccion> Logger { get; }

        public MiFiltroDeAccion(ILogger<MiFiltroDeAccion> logger)
        {
            Logger = logger;
        }
        /// <summary>
        /// Antes de ejecutar la accion
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            Logger.LogInformation("Antes de ejecutar la acción");
        }

        /// <summary>
        /// Después de ejecutar la acción
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Logger.LogInformation("Despues de ejecutar la acción");
        }

       
    }
}
