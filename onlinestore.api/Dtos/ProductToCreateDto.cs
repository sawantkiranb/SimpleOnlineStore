using System;
using System.ComponentModel.DataAnnotations;

namespace onlinestore.api.Dtos
{
    public class ProductToCreateDto
    {
        [Required]
        [StringLength(25, MinimumLength = 3, ErrorMessage = "Product name should be between 3 to 100 characters")]
        public string Name { get; set; }

        [Required]
        [Range(0, 2000, ErrorMessage = "Stock should be between 0 to 2000")]
        public int Stock { get; set; }

        [Required]
        [Range(1, 2000, ErrorMessage = "Price should be between 1 to 2000")]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        public DateTime DateAdded { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public ProductToCreateDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}