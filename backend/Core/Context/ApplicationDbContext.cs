using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<MyTask> MyTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MyTask>()
                .HasOne(mytask => mytask.Activity)
                .WithMany(activity => activity.MyTasks)
                .HasForeignKey(mytask => mytask.ActivityId);

            modelBuilder.Entity<Activity>()
                .Property(activity => activity.ActivityType)
                .HasConversion<string>();

            modelBuilder.Entity<Activity>()
                .Property(activity => activity.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Activity>()
                .Property(activity => activity.StatusTheme)
                .HasConversion<string>();

            modelBuilder.Entity<Activity>()
                .Property(activity => activity.Tag)
                .HasConversion<string>();

            modelBuilder.Entity<Activity>()
                .Property(activity => activity.TagTheme)
                .HasConversion<string>();

            modelBuilder.Entity<MyTask>()
                .Property(mytask => mytask.Status)
                .HasConversion<string>();

            modelBuilder.Entity<MyTask>()
                .Property(mytask => mytask.StatusTheme)
                .HasConversion<string>();

            modelBuilder.Entity<MyTask>()
                .Property(mytask => mytask.Tag)
                .HasConversion<string>();

            modelBuilder.Entity<MyTask>()
                .Property(mytask => mytask.TagTheme)
                .HasConversion<string>();
        }
    }
}
