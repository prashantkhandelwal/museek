using Newtonsoft.Json;

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
}
