using MedPulse.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController(IDataService dataService) : ControllerBase
{
    [HttpGet("summary")]
    public IActionResult GetSummary() => Ok(dataService.GetSummary());

    [HttpGet("metrics")]
    public IActionResult GetMetrics([FromQuery] int count = 20) => Ok(dataService.GetMetricHistory(count));
}
