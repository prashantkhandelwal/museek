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
    public class MongoDBProvider<T> : IStorageProvider<T> where T: class, new()
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IStorageSettings _settings;
        private string _collection;
        
        public MongoDBProvider(IStorageSettings settings)
        {
            _client = new MongoClient(_settings.Host);
            _database = _client.GetDatabase(_settings.Database);
        }

        protected IMongoCollection<T> Collection
        {
            get
            {
                return _database.GetCollection<T>(_collection);
            }
            set
            {
                Collection = value;
            }
        }

        public IMongoQueryable<T> Query 
        {
            get => Collection.AsQueryable<T>();  
            set => Query = value; 
        }

        public T Get(Expression<Func<T, bool>> expression)
        {
            return Collection.Find(expression).SingleOrDefault();
        }
    }
}
