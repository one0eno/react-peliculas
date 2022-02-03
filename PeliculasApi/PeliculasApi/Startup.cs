using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PeliculasApi.ApiBehavior;
using PeliculasApi.Filtros;
using PeliculasApi.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAutoMapper(typeof(Startup));
            //services.AddTransient<IAlmacenadorArchivos, AlmacenadorAzureStorage>();
            
            //Para guardar archivos en local
            services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();
            services.AddHttpContextAccessor();
            

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
            // services.AddResponseCaching();

            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(

                Configuration.GetConnectionString("defaultConnection")

                ));

            //services.AddCors(options =>
            //{
            //    var frontenURL = Configuration.GetValue<string>("frontend_url");
            //    options.AddDefaultPolicy(builder =>
            //    {
            //        builder.WithOrigins(frontenURL).AllowAnyMethod().AllowAnyHeader();
            //    });
            //});
            services.AddCors(options =>
            {
                var frontenURL = Configuration.GetValue<string>("frontend_url");
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins(frontenURL)
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .WithExposedHeaders(new string[] { "cantidadTotalRegistros"});
                                  });
            });
            //Registrado el filtro a nivel global de la app
            //ConfigureApiBehaviorOptions es necesario para que sea global y no moleste 
            // ApiController 
            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(FiltroDeException));
                options.Filters.Add(typeof(ParsearBadRequest));
            }).ConfigureApiBehaviorOptions(BehaviorBadRequest.Parsear);


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PeliculasApi", Version = "v1" });
            });
           
            services.AddTransient<MiFiltroDeAccion>();
           
           // services.AddScoped<IRepositorio, RepositoryEnMemoria>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PeliculasApi v1"));
            }


            //app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();

            //Me permite usar archivos estaticos
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            
            //app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
