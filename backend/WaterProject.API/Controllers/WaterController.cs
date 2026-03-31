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

    [HttpPost("AddProject")]
    public IActionResult AddProject([FromBody] Project newProject)
    {
        _watercontext.Projects.Add(newProject);
        _watercontext.SaveChanges();
        return Ok(newProject);
    }

    [HttpPut("UpdateProject/{id}")]
    public IActionResult UpdateProject(int id, [FromBody] Project updatedProject)
    {
        var existingProject = _watercontext.Projects.Find(id);
        if (existingProject == null)
        {
            return NotFound();
        }

        existingProject.ProjectName = updatedProject.ProjectName;
        existingProject.ProjectType = updatedProject.ProjectType;
        existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
        existingProject.ProjectImpact = updatedProject.ProjectImpact;
        existingProject.ProjectPhase = updatedProject.ProjectPhase;
        existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

        _watercontext.Projects.Update(existingProject);
        _watercontext.SaveChanges();
        return Ok(existingProject);
    }

    [HttpDelete("DeleteProject/{id}")]
    public IActionResult DeleteProject(int id)
    {
        var existingProject = _watercontext.Projects.Find(id);
        if (existingProject == null)
        {
            return NotFound();
        }

        _watercontext.Projects.Remove(existingProject);
        _watercontext.SaveChanges();
        return NoContent();
    }
}