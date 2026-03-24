using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WaterController : ControllerBase
{
    private WaterDbContext _watercontext;
    public WaterController(WaterDbContext tempContext) => _watercontext = tempContext;

    [HttpGet("AllProjects")]
    public IActionResult Get(int pageSize = 10, int pageNum =1, [FromQuery] List<string>? projectTypes= null)
    {
        var query = _watercontext.Projects.AsQueryable();

        if (projectTypes != null && projectTypes.Any())
        {
            query = query.Where(p => projectTypes.Contains(p.ProjectType));
        }
        
        var totalNumProjects = query.Count();

        var projects = query
            .Skip((pageNum -1) *  pageSize)
            .Take(pageSize)
            .ToList();
        

        var returnedObject = new
        {
            Projects = projects,
            TotalNumProjects = totalNumProjects
        };
        
        return Ok(returnedObject);
    }

    [HttpGet("GetProjectTypes")]
    public IActionResult GetProjectTypes()
    {
        var projectTypes =
            _watercontext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
        return Ok(projectTypes);
    }
}