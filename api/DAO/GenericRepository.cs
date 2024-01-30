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
      this.dbSet = _db.Set<T>();
    }

    public virtual async Task<T> GetEntityById(object id)
    {
      return await dbSet.FindAsync(id);
    }

    public virtual async Task<List<T>> GetAll()
    {
      IQueryable<T> query = dbSet.AsQueryable();
      return await query.ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> GetEntities(
            Expression<Func<T, bool>> filter,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
            string includeProperties)
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


    public virtual void Add(T entity)
    {
      dbSet.Add(entity);
    }

    public virtual void Update(T entity)
    {
      dbSet.Attach(entity);

      _db.Entry(entity).State = EntityState.Modified;

    }


    public virtual void Delete(T entity)
    {
      if (_db.Entry(entity).State == EntityState.Detached)
      {
        dbSet.Attach(entity);
      }
      dbSet.Remove(entity);
    }
    public virtual void DeleteById(object id)
    {
      T entityToDelete = dbSet.Find(id);
      Delete(entityToDelete);
    }


    public virtual IQueryable<T> QueryWithConditions(
            Expression<Func<T, bool>> filter,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
            string includeProperties)
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



  }
}