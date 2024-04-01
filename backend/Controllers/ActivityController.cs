using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Activity;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper {  get; }
        public ActivityController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD operations

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateActivity([FromBody] ActivityCreateDto dto)
        {
            Activity newActivity = _mapper.Map<Activity>(dto);
            await _context.Activities.AddAsync(newActivity);
            await _context.SaveChangesAsync();

            return Ok("Activity created succesfully");
        }
        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ActivityGetDto>>> GetActivities()
        {
            var activities = await _context.Activities.OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedActivities = _mapper.Map<IEnumerable<ActivityGetDto>>(activities);

            return Ok(convertedActivities);
        }
        //Read (get activity by id)
        [HttpGet]
        [Route("Get/{id}")]
        public async Task<ActionResult<ActivityGetDto>> GetActivityById(long id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound("Activity you were searching is not found");
            }
            var convertedActivity = _mapper.Map<ActivityGetDto>(activity);

            return Ok(convertedActivity);
        }

        //Update
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateActivity(long id, [FromBody] ActivityUpdateDto dto)
        {
            var existingActivity = await _context.Activities.FindAsync(id);

            if (existingActivity == null)
            {
                return NotFound("Activity not found");
            }

            _mapper.Map(dto, existingActivity);
            existingActivity.UpdatedAt = DateTime.Now;

            _context.Activities.Update(existingActivity);
            await _context.SaveChangesAsync();

            return Ok("Activity updated successfully");
        }

        //Delete
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteActivity(long id)
        {
            var existingActivity = await _context.Activities.FindAsync(id);

            if (existingActivity == null)
            {
                return NotFound("Activity not found");
            }

            _context.Activities.Remove(existingActivity);
            await _context.SaveChangesAsync();

            return Ok("Activity deleted successfully");
        }
    }
}
