using Newtonsoft.Json;

namespace api.Wrapper
{
    public class Song
    {
        [JsonProperty("track")]
        public Track Track { get; set; }
    }

    public class Track
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("mbid")]
        public string MBID { get; set; }

        [JsonProperty("artist")]
        public Artist Artist { get; set; }

        [JsonProperty("album")]
        public Album Album { get; set; }

        [JsonProperty("wiki")]
        public Wiki Wiki { get; set; }
    }

    public class Album
    {
        [JsonProperty("artist")]
        public string Artist { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("mbid")]
        public string MBID { get; set; }

        public CoverArt CoverArt { get; set; }
    }
    public class Wiki
    {
        [JsonProperty("published")]
        public string Published { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

    }

    /// <summary>
    /// Class for MusicBrainz Recording API
    /// </summary>
    public class Recording
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("first-release-date")]
        public string ReleaseDate { get; set; }
    }
}
