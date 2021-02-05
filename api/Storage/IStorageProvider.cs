using api.Models;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace api.Storage
{
    /// <summary>
    /// Provide the implementation for multiple datasources.
    /// </summary>
    public interface IStorageProvider<T> where T : class
    {
        IQueryable<T> AsQueryable();
        IEnumerable<T> FilterBy(Expression<Func<T, bool>> expression);
        IEnumerable<TProjected> FilterBy<TProjected>(Expression<Func<T, bool>> filterExpression, Expression<Func<T, TProjected>> projectionExpression);
    }
}
