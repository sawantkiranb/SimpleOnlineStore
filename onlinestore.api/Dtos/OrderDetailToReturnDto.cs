namespace onlinestore.api.Dtos
{
    public class OrderDetailToReturnDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string ProductName { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int Total { get; set; }
    }
}