using MedPulse.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AlertsController(IDataService dataService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAlerts([FromQuery] bool onlyActive = true) => Ok(dataService.GetAlerts(onlyActive));

    [HttpPost("{id:int}/acknowledge")]
    public IActionResult Acknowledge(int id) =>
        dataService.TryAcknowledgeAlert(id) ? NoContent() : NotFound();
}
