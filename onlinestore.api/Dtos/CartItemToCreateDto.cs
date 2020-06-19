using System;

namespace onlinestore.api.Dtos
{
    public class CartItemToCreateDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime DateAdded { get; set; }

        public CartItemToCreateDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}