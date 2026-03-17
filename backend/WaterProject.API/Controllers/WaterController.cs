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
    public IEnumerable<Project> Get()
    {
        var projects = _watercontext.Projects.ToList();
        return projects;
    }

    [HttpGet("FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var functionalProjects =
            _watercontext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return functionalProjects;
    }
}