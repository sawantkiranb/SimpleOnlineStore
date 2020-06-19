using System.Collections.Generic;
using onlinestore.api.Models;

namespace onlinestore.api.Dtos
{
    public class ProductForDetailsDto
    {

        public int Id { get; set; }
        public int SerialNo { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string PhotoUrl { get; set; }
        public string Category { get; set; }
        public ICollection<PhotoForDetailsDto> Photos { get; set; }
    }
}