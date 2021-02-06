using api.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace api.Storage.Providers
{
    public class MongoDBProvider<T> : IStorageProvider<T> where T: class
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<T> _collection;
        
        public MongoDBProvider(IStorageSettings settings)
        {
            _client = new MongoClient(settings.Host);
            _database = _client.GetDatabase(settings.Database);
            _collection = _database.GetCollection<T>(typeof(T).Name.ToLowerInvariant());
        }

        public IQueryable<T> AsQueryable() => _collection.AsQueryable();

        public virtual IEnumerable<T> FilterBy(Expression<Func<T, bool>> expression)
        {
            return _collection.Find(expression).ToEnumerable();
        }

        public virtual IEnumerable<TProjected> FilterBy<TProjected>(Expression<Func<T, bool>> expression, Expression<Func<T, TProjected>> projectionExpression)
        {
            //TODO:  Cano also add this collation in order to do the case-insensitive search.
            // new FindOptions() {  Collation = new Collation("en", strength: CollationStrength.Secondary) }

            return _collection.Find(expression).Project(projectionExpression).ToEnumerable();
        }
    }
}
