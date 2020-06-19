using System;
using System.ComponentModel.DataAnnotations;

namespace onlinestore.api.Dtos
{
    public class ProductToUpdateDto
    {
        [Required]
        [Range(0, 2000, ErrorMessage = "Stock should be between 0 to 2000")]
        public int Stock { get; set; }

        [Required]
        [Range(1, 2000, ErrorMessage = "Price should be between 1 to 2000")]
        public int Price { get; set; }

        public DateTime DateModified { get; set; }

        public ProductToUpdateDto()
        {
            DateModified = DateTime.Now;
        }
    }
}