using System;

namespace onlinestore.api.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime? DateAdded { get; set; }

        public Product Product { get; set; }
    }
}