using System;
using System.Collections.Generic;

namespace onlinestore.api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public DateTime DateAdded { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}