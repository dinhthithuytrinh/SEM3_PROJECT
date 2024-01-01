using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
  public class PaginationParams
  {
    public int PageNumber { get; set; } = 1;


    private int _pageSize = 6; /// default
    private const int MaxPageSize = 50;

    public int PageSize
    {
      get => _pageSize;
      set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
  }
}