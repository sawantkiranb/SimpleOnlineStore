namespace onlinestore.api.Models
{
    public class ShippingAddress
    {
        public int Id { get; set; }
        public string ContactName { get; set; }
        public string Mobile { get; set; }
        public string Pincode { get; set; }
        public string Address { get; set; }
        public string Locality { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool IsHome { get; set; }
        public bool IsDefault { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}