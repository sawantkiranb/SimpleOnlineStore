using AutoMapper;
using onlinestore.api.Dtos;
using onlinestore.api.Models;

namespace onlinestore.api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserToReturnDto>();
        }
    }
}