using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using onlinestore.api.Data;
using onlinestore.api.Dtos;
using onlinestore.api.Helpers;
using onlinestore.api.Models;

namespace onlinestore.api.Controllers
{
    [ApiController]
    // [Authorize]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IStoreRepository _repo;
        private readonly IMapper _mapper;
        public ProductController(IStoreRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductFilter filter)
        {
            var productsFromRepo = await _repo.GetProducts(filter);

            var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(productsFromRepo);

            return Ok(productsToReturn);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<IActionResult> Get(int id)
        {
            var productFromRepo = await _repo.GetProduct(id);

            if (productFromRepo == null)
                return BadRequest();

            var productForDetails = _mapper.Map<ProductForDetailsDto>(productFromRepo);

            return Ok(productForDetails);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductToCreateDto productToCreateDto)
        {
            var maxProdId = await _repo.GetMaxProductId();

            var product = _mapper.Map<Product>(productToCreateDto);
            product.SerialNo = 1000 + maxProdId + 1;

            _repo.Add(product);

            if (!await _repo.SaveAll())
                return BadRequest("Failed to add product");

            var ProductToReturnDto = _mapper.Map<ProductToReturnDto>(product);
            return CreatedAtRoute("GetProduct", new { id = ProductToReturnDto.Id }, ProductToReturnDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductToUpdateDto productToUpdateDto)
        {
            var product = await _repo.GetProduct(id);
            if (product == null)
                return BadRequest("Product not found");

            _mapper.Map(productToUpdateDto, product);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Something went wrong whlie updating product with id : {id}");
        }

        [HttpPost("{userId}/like/{productId}")]
        public async Task<IActionResult> LikeProduct(int userId, int productId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var productFromRepo = await _repo.GetProduct(productId);
            if (productFromRepo == null)
                return BadRequest("Product not found");

            var likedProduct = await _repo.GetLikedProduct(userId, productId);
            if (likedProduct != null)
                return BadRequest("You have already liked this product");

            _repo.Add(new Like
            {
                ProductId = productId,
                UserId = userId,
                DateAdded = DateTime.Now
            });

            if (await _repo.SaveAll())
                return Ok();

            throw new Exception("Failed to add product too wishlist");
        }

        [HttpPost("{userId}/dislike/{productId}")]
        public async Task<IActionResult> DislikeProduct(int userId, int productId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var likedProduct = await _repo.GetLikedProduct(userId, productId);
            if (likedProduct == null)
                return BadRequest("Product not found");

            _repo.Delete(likedProduct);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Failed to removing product from wishlist");
        }

        [HttpGet("{userId}/like")]
        public async Task<IActionResult> GetLikedProducts(int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var likedProducts = await _repo.GetLikedProducts(userId);

            var likedProductsToReturn = _mapper.Map<IEnumerable<LikedProductToReturnDto>>(likedProducts);

            return Ok(likedProductsToReturn);
        }

    }
}