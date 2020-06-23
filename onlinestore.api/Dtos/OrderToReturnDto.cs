using System.Collections.Generic;

namespace onlinestore.api.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string ConfirmationNo { get; set; }
        public string UserEmail { get; set; }
        public string ShippingAddress { get; set; }
        public string Status { get; set; }

        public ICollection<OrderDetailToReturnDto> OrderDetails { get; set; }

    }
}