using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using onlinestore.api.Data;

namespace onlinestore.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]/{userId}")]
    public class OrderController : ControllerBase
    {
        private readonly IStoreRepository _repo;
        private readonly IMapper _mapper;
        public OrderController(IStoreRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
        //Create Order
        //Update order status

        //GetOrder
        //GetOrders
    }
}