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

        /// <summary>
        /// Gets the artist on the basis of the artist name on the basis of
        /// case sensitivity and exact match of the name.
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="IsMatch"></param>
        /// <returns>Artist</returns>
        public IEnumerable<dynamic> Get(string SearchText, bool IsMatch)
        {
            TextSearchOptions options = new TextSearchOptions
            {
                CaseSensitive = false,
                DiacriticSensitive = true
            };

            FilterDefinition<Artist> filter = Builders<Artist>.Filter.Text(SearchText, options);

            if (IsMatch)
            {
                return _collection.Find(x => x.Name == SearchText).Project(p =>
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
