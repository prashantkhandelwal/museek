using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace api.Models
{
    public class LifeSpan
    {
        [BsonElement("ended")]
        public bool IsEnded { get; set; }

        [BsonElement("ended")]
        public string BeginYear { get; set; }

        [BsonElement("ended")]
        public string EndYear { get; set; }
    }

    public class Alias
    {
        public string Name { get; set; }
    }

    public class Rating
    {
        [BsonElement("votes-count")]
        public int VoteCount { get; set; }

        [BsonElement("value")]
        public double VoteAvg { get; set; }
    }

    public class Genre
    {
        [BsonElement("id")]
        public string GenreId { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
    }

    public class Artist
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }

        [BsonElement("rating")]
        public Rating Rating { get; set; }

        [BsonElement("life-span")]
        public LifeSpan LifeSpan { get; set; }

        [BsonElement("genres")]
        public List<Genre> Genres { get; set; }

        [BsonElement("aliases")]
        public List<Alias> KnownAlias { get; set; }
    }
}
