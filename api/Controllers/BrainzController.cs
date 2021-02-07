using api.Models;
using api.Storage;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
        //private readonly IStorageProvider<Artist> db;

        private readonly IStorageSettings _settings;

        public BrainzController(IStorageSettings settings)
        {
            _settings = settings;
        }

        //public BrainzController(IStorageProvider<Artist> _provider)
        //{
        //    db = _provider;
        //}

        [HttpGet]
        public ObjectResult Get(string name, bool match = false)
        {
            if (!string.IsNullOrEmpty(name))
            {
                DB _db = new DB(_settings);
                var artists = _db.Get(name, match);
                return Ok(new { results = artists });
            }

            return Ok(new { results = "No results found!" });
        }
    }
}
