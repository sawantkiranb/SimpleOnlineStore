using System;

namespace onlinestore.api.Models
{
    public class Like
    {
        public int Id { get; set; }
        public DateTime? DateAdded { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}