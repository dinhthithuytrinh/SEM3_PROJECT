using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
  public class PagedList<T> where T : class
  {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }

    public int TotalCount { get; set; }
    public List<T> Data { get; set; }

    public PagedList(int pageNumber, int pageSize, int totalCount, List<T> data)
    {
      PageNumber = pageNumber;
      PageSize = pageSize;
      TotalCount = totalCount;
      Data = data;
    }
  }
}