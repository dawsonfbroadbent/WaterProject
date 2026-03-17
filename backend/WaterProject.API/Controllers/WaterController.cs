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
    public IActionResult Get(int pageSize = 10, int pageNum =1)
    {
        var projects = _watercontext.Projects
            .Skip((pageNum -1) *  pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumProjects = _watercontext.Projects.Count();

        var returnedObject = new
        {
            Projects = projects,
            TotalNumProjects = totalNumProjects
        };
        
        return Ok(returnedObject);
    }

    [HttpGet("FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var functionalProjects =
            _watercontext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return functionalProjects;
    }
}