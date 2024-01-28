using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
	public class ReturnCustomerBasket
	{
		[Required]
		public string Id { get; set; }
		public List<ReturnBasketItem> Items { get; set; }
	}
}