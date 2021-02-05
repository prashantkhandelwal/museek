using api.Models;
using api.Storage;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrainzController : Controller
    {
        private readonly IStorageProvider<Artist> db;

        public BrainzController(IStorageProvider<Artist> _provider)
        {
            db = _provider;
        }

        [HttpGet]
        public ObjectResult Index()
        {
            //var s = db.AsQueryable().Where(x => x.Name == "Eminem").Select(e => new { e.Name } ).Single();

            var d = db.FilterBy(x => x.Name == "Eminem", p => p.Name).ToList();


            return Ok(new { Value = "This is a message from Brainz API" });
        }
    }
}
