using api.Wrapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("museek")]
    public class MuseekController : Controller
    {
        public async Task<ObjectResult> Get()
        {
            Museek m = new Museek("a5ba86bd90f22a37d16e5976d5bbca4d");
            var response = await m.GetSong("eminem", "not afraid").ConfigureAwait(false);


            return Ok(new { response });
        }
    }
}
