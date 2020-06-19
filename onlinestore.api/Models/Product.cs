using System;
using System.Collections.Generic;

namespace onlinestore.api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int SerialNo { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}