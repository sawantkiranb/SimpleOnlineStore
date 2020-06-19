using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using onlinestore.api.Data;
using onlinestore.api.Dtos;
using onlinestore.api.Models;

namespace onlinestore.api.Controllers
{
    [ApiController]
    [Route("api/product/{userId}/cart")]
    [Authorize]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IStoreRepository _repo;
        private readonly IMapper _mapper;
        public ShoppingCartController(IStoreRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductToCart(int userId, CartItemToCreateDto cartItemToCreateDto)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var cartItemFromRepo = await _repo.GetCartItemForUser(userId, cartItemToCreateDto.ProductId);

            if (cartItemFromRepo != null)
            {
                cartItemFromRepo.Quantity = cartItemToCreateDto.Quantity;

                if (await _repo.SaveAll())
                    return Ok();
            }
            else
            {
                var cartItem = _mapper.Map<Cart>(cartItemToCreateDto);
                cartItem.UserId = userId;

                _repo.Add(cartItem);

                if (await _repo.SaveAll())
                {
                    var cartitemToReturn = _mapper.Map<CartItemToReturnDto>(cartItem);
                    return CreatedAtRoute("GetCartItem", new { userId, id = cartitemToReturn.Id }, cartitemToReturn);
                }
            }

            throw new Exception("Failed to add product to cart");
        }

        [HttpGet("{id}", Name = "GetCartItem")]
        public async Task<IActionResult> GetCartItem(int id)
        {
            var cartitem = await _repo.GetCartItem(id);
            var cartitemToReturn = _mapper.Map<CartItemToReturnDto>(cartitem);
            return Ok(cartitemToReturn);
        }

        [HttpGet(Name = "GetUserCart")]
        public async Task<IActionResult> GetCartForUser(int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userCart = await _repo.GetCartForUser(userId);

            var userCartToReturn = _mapper.Map<IEnumerable<CartItemToReturnDto>>(userCart);

            return Ok(userCartToReturn);

            throw new Exception("Failed to retirve user cart");
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetCartCountForUser(int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userCart = await _repo.GetCartForUser(userId);

            return Ok(userCart.Sum(p => p.Quantity));
            throw new Exception("Failed to retirve user cart length");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int userId, int id)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var cartItem = await _repo.GetCartItem(id);

            if (cartItem == null) return BadRequest("Item not found");

            _repo.Delete(cartItem);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("Failed to remove cart item");
        }

        //http://localhost:5001/api/product/1/cart/delete
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteUserCart(int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userCart = await _repo.GetCartForUser(userId);

            if (userCart.ToList().Count == 0) return BadRequest("No items to remove");

            foreach (Cart item in userCart)
            {
                _repo.Delete(item);
            }

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("Failed to remove cart");
        }

    }
}