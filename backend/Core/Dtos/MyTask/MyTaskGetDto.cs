using backend.Core.Enums;

namespace backend.Core.Dtos.MyTask
{
    public class MyTaskGetDto
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Status Status { get; set; }
        public StatusTheme StatusTheme { get; set; }
        public Tag Tag { get; set; }
        public TagTheme TagTheme { get; set; }
        public long ActivityId { get; set; }
        public string ActivityName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;            
    }
}
