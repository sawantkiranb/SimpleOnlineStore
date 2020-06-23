using System;
using System.Collections.Generic;

namespace onlinestore.api.Dtos
{
    public class OrderToCreateDto
    {
        public string ConfirmationNo { get; set; }
        public int UserId { get; set; }
        public int ShippingAddressId { get; set; }
        public string Status { get; set; }
        public DateTime DateAdded { get; set; }

        public ICollection<OrderDetailToCreateDto> OrderDetails { get; set; }

        public OrderToCreateDto()
        {
            DateAdded = DateTime.Now;
            Status = "Success";
            ConfirmationNo = Convert.ToString(Guid.NewGuid()).ToUpper();
        }
    }
}