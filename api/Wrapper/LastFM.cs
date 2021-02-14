using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Wrapper
{

    public class LastFM
    {
        [JsonProperty("artist")]
        public Artist Artist { get; set; }
    }

    public class Bio
    {
        [JsonProperty("summary")]
        public string Info { get; set; }
    }

    public class Artist
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("mbid")]
        public string MBID { get; set; }

        [JsonProperty("bio")]
        public Bio Biography { get; set; }

        
    }

    

    //public class Artist
    //{
    //    public string Country { get; set; }

    //    public Rating Rating { get; set; }

    //    public LifeSpan LifeSpan { get; set; }

    //    public List<Genre> Genres { get; set; }

    //    public List<Alias> KnownAlias { get; set; }
    //}
}
