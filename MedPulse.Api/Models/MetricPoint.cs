namespace MedPulse.Api.Models;

public class MetricPoint
{
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    public int HeartRate { get; set; }
    public int OxygenLevel { get; set; }
}
