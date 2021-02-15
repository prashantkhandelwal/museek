using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Wrapper
{
    public class MusicBrainz
    {
        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("rating")]
        public Rating Rating { get; set; }

        [JsonProperty("life-span")]
        public LifeSpan LifeSpan { get; set; }

        [JsonProperty("genres")]
        public List<Genre> Genres { get; set; }

        [JsonProperty("aliases")]
        public List<Alias> KnownAlias { get; set; }

        [JsonProperty("relations")]
        public List<Relations> Relations { get; set; }

        [JsonProperty("gender")]
        public string Gender { get; set; }
    }

    public class Relations
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("url")]
        public Url Url { get; set; }
    }

    public class Url
    {
        [JsonProperty("resource")]
        public string ImageURL { get; set; }
    }

    public class LifeSpan
    {
        [JsonProperty("ended")]
        public bool? IsEnded { get; set; }

        [JsonProperty("begin")]
        public string BeginYear { get; set; }

        [JsonProperty("end")]
        public string EndYear { get; set; }
    }

    public class Alias
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public class Rating
    {
        [JsonProperty("votes-count")]
        public int VoteCount { get; set; }

        [JsonProperty("value")]
        public double? VoteAvg { get; set; }
    }

    public class Genre
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }

    //public class MusicBrainz
    //{
    //    [JsonProperty("artists")]
    //    public List<Artists> Artists { get; set; }
    //}
}
