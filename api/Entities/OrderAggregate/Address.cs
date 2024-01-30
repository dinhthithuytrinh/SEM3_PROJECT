using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities.OrderAggregate
{
  public class Address
  {
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Street { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string State { get; set; }
    [Required]
    public string ZipCode { get; set; }

    public Address() { }

    public Address(string firstName, string lastName, string street, string city, string state, string zipCode)
    {
      FirstName = firstName;
      LastName = lastName;
      Street = street;
      City = city;
      State = state;
      ZipCode = zipCode;
    }
  }
}