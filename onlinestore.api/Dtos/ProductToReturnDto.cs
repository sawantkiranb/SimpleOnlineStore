namespace onlinestore.api.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public int SerialNo { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }
        public string ShortDescription { get; set; }
        public string PhotoUrl { get; set; }
        public int Likes { get; set; }
    }
}