using api.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Storage
{
    public class DB
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Artist> _collection;

        public DB(IStorageSettings settings)
        {
            _client = new MongoClient(settings.Host);
            _database = _client.GetDatabase(settings.Database);
            _collection = _database.GetCollection<Artist>("artist");
        }

        public IEnumerable<dynamic> Get(string SearchText, bool IsMatch)
        {
            TextSearchOptions options = new TextSearchOptions
            {
                CaseSensitive = IsMatch ? true: false,
                DiacriticSensitive = true
            };

            FilterDefinition<Artist> filter = Builders<Artist>.Filter.Text(SearchText, options);
            return _collection.Find(filter).Project(p =>
            new
            {
                Name = p.Name,
                Id = p.Id,
                Country = p.Country,
                Genres = p.Genres.Select(g => g.Name),
                Rating = p.Rating,
                KnownAlias = p.KnownAlias.Select(a => a.Name),
                LifeSpan = p.LifeSpan,
            }).ToList();
        }
    }
}
