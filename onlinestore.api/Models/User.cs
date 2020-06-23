using System;
using System.Collections.Generic;

namespace onlinestore.api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public ICollection<Like> Likes { get; set; }
        public ICollection<ShippingAddress> ShippingAddresses { get; set; }
    }
}