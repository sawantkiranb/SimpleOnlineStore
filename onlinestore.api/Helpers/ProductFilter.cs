namespace onlinestore.api.Helpers
{
    public class ProductFilter
    {
        public string SortBy { get; set; }
        public string SearchText { get; set; }
        
        public ProductFilter()
        {
            SortBy = "new";
        }
    }
}