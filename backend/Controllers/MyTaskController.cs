using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Activity;
using backend.Core.Dtos.MyTask;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyTaskController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public MyTaskController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateMyTask([FromBody] MyTaskCreateDto dto)
        {
            var newMyTask = _mapper.Map<MyTask>(dto);
            await _context.MyTasks.AddAsync(newMyTask);
            await _context.SaveChangesAsync();

            return Ok("Task created succesfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<MyTaskGetDto>>> GetMyTasks()
        {
            var mytasks = await _context.MyTasks.Include(mytask => mytask.Activity).OrderByDescending(q => q.StartDate).ToListAsync();
            var convertedMyTasks = _mapper.Map<IEnumerable<MyTaskGetDto>>(mytasks);

            return Ok(convertedMyTasks);
        }

        //Read (get mytask by id)
        [HttpGet]
        [Route("Get/{id}")]
        public async Task<ActionResult<ActivityGetDto>> GetMyTaskById(long id)
        {
            var mytask = await _context.MyTasks.FindAsync(id);
            if (mytask == null)
            {
                return NotFound("The task you were searching is not found");
            }
            var convertedMyTask = _mapper.Map<MyTaskGetDto>(mytask);

            return Ok(convertedMyTask);
        }

        //Update
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateMyTask(long id, [FromBody] MyTaskUpdateDto dto)
        {
            var existingMyTask = await _context.MyTasks.FindAsync(id);

            if (existingMyTask == null)
            {
                return NotFound("Task not found");
            }

            _mapper.Map(dto, existingMyTask);
            existingMyTask.UpdatedAt = DateTime.Now;

            _context.MyTasks.Update(existingMyTask);
            await _context.SaveChangesAsync();

            return Ok("Task updated successfully");
        }

        //Delete
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteMyTask(long id)
        {
            var existingMyTask = await _context.MyTasks.FindAsync(id);

            if (existingMyTask == null)
            {
                return NotFound("Task not found");
            }

            _context.MyTasks.Remove(existingMyTask);
            await _context.SaveChangesAsync();

            return Ok("Task deleted successfully");
        }
    }
}
