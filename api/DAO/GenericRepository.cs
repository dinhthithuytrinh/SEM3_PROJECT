using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.DAO
{
  public class GenericRepository<T> where T : class
  {
    private readonly ApplicationDbContext _db;
    private DbSet<T> dbSet;

    public GenericRepository(ApplicationDbContext dbContext)
    {
      _db = dbContext;
      dbSet = _db.Set<T>();
    }

    public async Task<T> GetEntityById(object id)
    {
      return await dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAll()
    {
      var query = dbSet.AsQueryable();
      return await query.ToListAsync();
    }


    public async Task<IEnumerable<T>> GetEntities(
        Expression<Func<T, bool>> filter, /// where t.id = 1
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, /// q => q.OrderBy(s => s.Date)
        string includeProperties)  /// ProductType,ProductBrand
    {
      IQueryable<T> query = dbSet.AsQueryable();

      if (filter != null)
      {
        query = query.Where(filter);
      }

      if (includeProperties != null && includeProperties != "")
      {
        string[] splittedIncludeProperties =
            includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var includeProperty in splittedIncludeProperties)
        {
          query = query.Include(includeProperty);
        }
      }

      if (orderBy != null)
      {
        return await orderBy(query).ToListAsync();
      }
      else
      {
        return await query.ToListAsync();
      }
    }

    public IQueryable<T> QueryWithCondition(
        Expression<Func<T, bool>> filter, /// where t.id = 1
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, /// q => q.OrderBy(s => s.LasName)
        string includeProperties)  /// ProductType,ProductBrand
    {
      IQueryable<T> query = dbSet.AsQueryable();

      if (filter != null)
      {
        query = query.Where(filter);
      }

      if (includeProperties != null && includeProperties != "")
      {
        string[] splittedIncludeProperties =
            includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var includeProperty in splittedIncludeProperties)
        {
          query = query.Include(includeProperty);
        }
      }

      if (orderBy != null)
      {
        return orderBy(query);
      }
      else
      {
        return query;
      }
    }
    public void Add(T entity)
    {
      dbSet.Add(entity);
    }

    public void Update(T entity)
    {
      dbSet.Attach(entity);
      _db.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
      if (_db.Entry(entity).State == EntityState.Detached)
      {
        dbSet.Attach(entity);
      }
      dbSet.Remove(entity);
    }

    public void DeleteById(object id)
    {
      T entity = dbSet.Find(id);
      Delete(entity);
    }
  }
}