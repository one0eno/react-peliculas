using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi.Filtros
{
    public class FiltroDeException:ExceptionFilterAttribute
    {
        private readonly ILogger<FiltroDeException> Logger;
        public FiltroDeException(ILogger<FiltroDeException> logger)
        {
            Logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            Logger.LogError(context.Exception, context.Exception.Message );
            base.OnException(context);
        }
    }
}
