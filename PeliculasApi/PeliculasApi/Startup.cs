using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using PeliculasApi.ApiBehavior;
using PeliculasApi.Filtros;
using PeliculasApi.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            //Para geomitria y los mapas y autommaper
            services.AddSingleton(provider =>
                new MapperConfiguration(config =>
                {
                    var geomitriFactory = provider.GetRequiredService<GeometryFactory>();
                    config.AddProfile(new AutomapperProfiles(geomitriFactory));
                }).CreateMapper());

            //Para geomitria y los mapas
            services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

            services.AddTransient<IAlmacenadorArchivos, AlmacenadorAzureStorage>();

            /*Configuracion tablas de usuarios identity*/
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();

            //configuranado addjwtbearer para proteger el webapi 
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opciones =>
                opciones.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    //tiempo de vida del token
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    //validamos el timeming key, firma con llave privada
                    IssuerSigningKey = new SymmetricSecurityKey(
                         Encoding.UTF8.GetBytes(Configuration["llavejwt"])),
                    //Para evitar problemas de diferencia de tiempo al calcular si el token venció
                    ClockSkew = TimeSpan.Zero

                    

                }); 
            // services.AddResponseCaching();

            services.AddDbContext<ApplicationDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("defaultConnection"),
                sqlServer => sqlServer.UseNetTopologySuite())

                );

           

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
