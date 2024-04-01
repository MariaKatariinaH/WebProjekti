using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Activity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ActivityType ActivityType { get; set; }
        public Status Status { get; set; }
        public StatusTheme StatusTheme { get; set; }
        public Tag Tag { get; set; }
        public TagTheme TagTheme { get; set; }

        //Relations:
        public ICollection<MyTask> MyTasks { get; set; }
    }
}
