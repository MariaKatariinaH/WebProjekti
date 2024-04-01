using backend.Core.Enums;
using System.Security.Cryptography.X509Certificates;

namespace backend.Core.Entities
{
    public class MyTask : BaseEntity
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Status Status { get; set; }
        public StatusTheme StatusTheme { get; set; }
        public Tag Tag { get; set; }
        public TagTheme TagTheme { get; set; }

        //Relations
        public long ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}
