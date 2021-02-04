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
        [HttpGet]
        public ObjectResult Index()
        {
            return Ok(new { Value = "This is a message from Brainz API" });
        }
    }
}
