using AutoMapper;
using Desafio.Api.ViewModel;
using Desafio.Business.Models;
using Desafio.Business.Models.Request;

namespace Desafio.Api.AutoMapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<UserViewModel, User>().ReverseMap()
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName));

            CreateMap<UserRequest, User>().ReverseMap();
        }
    }
}
