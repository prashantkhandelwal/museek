using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Wrapper
{
    public class Image
    {
        [JsonProperty("image")]
        public string CoverArt { get; set; }

        [JsonProperty("thumbnails")]
        public List<Thumbnails> Thumbnails { get; set; }
    }

    public class Thumbnails
    {
        [JsonProperty("1200")]
        public string _1200 { get; set; }
        
        [JsonProperty("250")]
        public string _250 { get; set; }

        [JsonProperty("500")]
        public string _500 { get; set; }

        public string large { get; set; }

        public string small { get; set; }
    }

    public class CoverArt
    {
        [JsonProperty("release")]
        public string Release { get; set; }

        [JsonProperty("images")]
        public List<Image> Images { get; set; }

    }
}
