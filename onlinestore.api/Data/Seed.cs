using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using onlinestore.api.Models;

namespace onlinestore.api.Data
{
    public class Seed
    {
        public static void SeedCategories(DataContext context)
        {
            if (!context.Categories.Any())
            {
                var categoriesData = System.IO.File.ReadAllText("Data/CategoriesSeedData.json");
                var categories = JsonConvert.DeserializeObject<List<Category>>(categoriesData);

                foreach (var category in categories)
                {
                    category.DateAdded = DateTime.Now;
                    context.Categories.Add(category);
                }
                context.SaveChanges();
            }
        }

        public static void SeedProducts(DataContext context)
        {
            if (!context.Products.Any())
            {
                var productsData = System.IO.File.ReadAllText("Data/ProductsSeedData.json");
                var products = JsonConvert.DeserializeObject<List<Product>>(productsData);

                foreach (var product in products)
                {
                    context.Products.Add(product);
                }
                context.SaveChanges();
            }
        }

    }
}