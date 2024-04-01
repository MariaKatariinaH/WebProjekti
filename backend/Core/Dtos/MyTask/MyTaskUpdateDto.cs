using backend.Core.Enums;

namespace backend.Core.Dtos.MyTask
{
    public class MyTaskUpdateDto
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Status Status { get; set; }
        public StatusTheme StatusTheme { get; set; }
        public Tag Tag { get; set; }
        public TagTheme TagTheme { get; set; }
        public long ActivityId { get; set; }
    }
}
