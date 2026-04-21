using MedPulse.Api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace MedPulse.Api.Services;

public class MetricBroadcastService(
    IDataService dataService,
    IHubContext<MetricsHub> hubContext,
    ILogger<MetricBroadcastService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var metric = dataService.PushNextMetric();
            await hubContext.Clients.All.SendAsync("metric-updated", metric, stoppingToken);
            logger.LogInformation("Metric broadcast at {TimestampUtc}", metric.TimestampUtc);
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}
