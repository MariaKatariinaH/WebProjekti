using backend.Core.Enums;

namespace backend.Core.Dtos.Activity
{
    public class ActivityCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ActivityType ActivityType { get; set; }
        public Status Status { get; set; }
        public StatusTheme StatusTheme { get; set; }
        public Tag Tag { get; set; }
        public TagTheme TagTheme { get; set; }
    }
}
