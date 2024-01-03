using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
  public class ProductRequestParams
  {
    public int? BrandId { get; set; }
    public int? TypeId { get; set; }
    public string Sort { get; set; }
    public int? Client { get; set; }


    private string _search;
    public string Search
    {
      get => _search;
      set => _search = value.ToLower();
    }
  }
}