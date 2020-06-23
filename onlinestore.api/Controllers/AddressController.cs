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
    [Authorize]
    [Route("api/[controller]/{userId}")]
    public class AddressController : ControllerBase
    {
        private readonly IStoreRepository _repo;
        private readonly IMapper _mapper;
        public AddressController(IStoreRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAddressesForUser(int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressesFromRepo = await _repo.GetAddresses(userId);

            var addressesToReturn = _mapper.Map<IEnumerable<AddressToReturnDto>>(addressesFromRepo);

            return Ok(addressesToReturn);
        }

        [HttpGet("address/{id}", Name = "GetAddress")]
        public async Task<IActionResult> GetAddress(int userId, int id)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressFromRepo = await _repo.GetAddress(id);
            var addressToReturn = _mapper.Map<AddressToReturnDto>(addressFromRepo);

            return Ok(addressToReturn);
        }

        [HttpPost("address/{id}")]
        public async Task<IActionResult> SetDefaultAddress(int userId, int id)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressFromRepo = await _repo.GetAddress(id);

            if (addressFromRepo == null)
                return BadRequest("Address not found");

            var addressesFromRepo = await _repo.GetAddresses(userId);
            foreach (var address in addressesFromRepo)
            {
                if ((address.Id != addressFromRepo.Id))
                    address.IsDefault = false;
            }

            addressFromRepo.IsDefault = true;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Failed to set default address");
        }

        [HttpDelete("address/{id}")]
        public async Task<IActionResult> DeleteAddress(int userId, int id)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressFromRepo = await _repo.GetAddress(id);

            if (addressFromRepo == null)
                return BadRequest("Address not found");

            _repo.Delete(addressFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Failed to remove address");
        }

        [HttpPost]
        public async Task<IActionResult> AddAddress(int userId, AddressToCreateDto addressToCreateDto)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressesFromRepo = await _repo.GetAddresses(userId);

            if (addressesFromRepo.ToList().Count == 0)
                addressToCreateDto.IsDefault = true;

            var address = _mapper.Map<ShippingAddress>(addressToCreateDto);
            address.UserId = userId;
            _repo.Add(address);

            if (await _repo.SaveAll())
            {
                var addressToReturn = _mapper.Map<AddressToReturnDto>(address);
                return CreatedAtRoute("GetAddress", new { userId, id = addressToReturn.Id }, addressToReturn);
            }

            throw new Exception("Failed to add address");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAddress(int userId, AddressToCreateDto addressToCreateDto)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var addressFromRepo = await _repo.GetAddress(Convert.ToInt32(addressToCreateDto.Id));

            if (addressFromRepo == null)
                return BadRequest("Address not found");

            var addressesFromRepo = await _repo.GetAddresses(userId);
            foreach (var address in addressesFromRepo)
            {
                if ((address.Id != addressFromRepo.Id))
                    address.IsDefault = false;
            }

            if (await _repo.SaveAll())
                return NoContent();

            _mapper.Map(addressToCreateDto, addressFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            throw new Exception("Failed to update address");
        }

    }
}