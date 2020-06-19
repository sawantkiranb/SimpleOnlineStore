namespace onlinestore.api.Dtos
{
    public class CartItemToReturnDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
         public string ShortDescription { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int TotalPrice { get; set; }
    }
}