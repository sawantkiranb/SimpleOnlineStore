using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using onlinestore.api.Data;
using onlinestore.api.Dtos;

namespace onlinestore.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IStoreRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IStoreRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var userFromRepo = await _repo.GetUser(id);

            if (userFromRepo == null) return BadRequest("User not found");

            var userToReturn = _mapper.Map<UserToReturnDto>(userFromRepo);

            return Ok(userToReturn);
        }

    }
}