using api.Models;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Storage
{
    /// <summary>
    /// Provide the implementation for multiple datasources.
    /// </summary>
    public interface IStorageProvider<T> where T : class, new()
    {
        IMongoQueryable<T> Query {get; set;}
    }
}
