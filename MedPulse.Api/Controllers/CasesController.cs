using MedPulse.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CasesController(IDataService dataService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetCases([FromQuery] string? status = null) => Ok(dataService.GetCases(status));

    [HttpGet("{id:int}")]
    public IActionResult GetCase(int id)
    {
        var record = dataService.GetCaseById(id);
        return record is null ? NotFound() : Ok(record);
    }

    [HttpGet("{id:int}/metrics")]
    public IActionResult GetCaseMetrics(int id, [FromQuery] int count = 30)
    {
        if (dataService.GetCaseById(id) is null)
        {
            return NotFound();
        }

        return Ok(dataService.GetCaseMetricHistory(id, count));
    }
}
