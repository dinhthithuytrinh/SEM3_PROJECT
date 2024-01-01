using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Exceptions
{
    public class ValidateInputErrorResponse : ErrorResponse
    {
        public ValidateInputErrorResponse(int statusCode, string message = null) : base(statusCode, message)
        {
        }

        public IEnumerable<string> Errors { get; set; }
    }
}