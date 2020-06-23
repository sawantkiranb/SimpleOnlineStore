namespace onlinestore.api.Dtos
{
    public class OrderDetailToCreateDto
    {
         public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int Total { get; set; }
    }
}