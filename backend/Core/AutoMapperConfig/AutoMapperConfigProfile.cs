using AutoMapper;
using backend.Core.Dtos.Activity;
using backend.Core.Dtos.MyTask;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            //Activity
            CreateMap<ActivityCreateDto, Activity>();
            CreateMap<Activity, ActivityGetDto>();
            CreateMap<ActivityUpdateDto, Activity>();

            //MyTask
            CreateMap<MyTaskCreateDto, MyTask>();
            CreateMap<MyTask, MyTaskGetDto>()
                .ForMember(dest => dest.ActivityName, opt => opt.MapFrom(src => src.Activity.Name));
            CreateMap<MyTaskUpdateDto, MyTask>();
        }
    }
}
