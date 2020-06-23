using System.Linq;
using AutoMapper;
using onlinestore.api.Dtos;
using onlinestore.api.Models;

namespace onlinestore.api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //User
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserToReturnDto>();

            //Product
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.Likes.Count));

            CreateMap<Product, ProductForDetailsDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain == true).Url))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.CategoryName));

            CreateMap<ProductToCreateDto, Product>();
            CreateMap<ProductToUpdateDto, Product>();

            //Photo
            CreateMap<Photo, PhotoForDetailsDto>();

            //Cart
            CreateMap<CartItemToCreateDto, Cart>();

            CreateMap<Cart, CartItemToReturnDto>()
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.Product.Price * src.Quantity))
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.ShortDescription, opt => opt.MapFrom(src => src.Product.ShortDescription))
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Product.Photos.FirstOrDefault(p => p.IsMain == true).Url));

            //Wishlist
            CreateMap<Like, LikedProductToReturnDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
            .ForMember(dest => dest.SerialNo, opt => opt.MapFrom(src => src.Product.SerialNo))
            .ForMember(dest => dest.ShortDescription, opt => opt.MapFrom(src => src.Product.ShortDescription))
            .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Product.Stock))
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Product.Photos.FirstOrDefault(p => p.IsMain).Url));

            //Shipping address
            CreateMap<AddressToCreateDto, ShippingAddress>();
            CreateMap<ShippingAddress, AddressToReturnDto>();

        }
    }
}