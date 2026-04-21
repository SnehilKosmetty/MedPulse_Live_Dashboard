using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace MedPulse.Api.Hubs;

[Authorize]
public class MetricsHub : Hub
{
}
