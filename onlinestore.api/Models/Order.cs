using System;
using System.Collections.Generic;

namespace onlinestore.api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string ConfirmationNo { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ShippingAddressId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public string Status { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }

    }
}