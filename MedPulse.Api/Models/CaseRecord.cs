namespace MedPulse.Api.Models;

public class CaseRecord
{
    public int Id { get; set; }
    public string PatientName { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public string Status { get; set; } = "Stable";
    public int HeartRate { get; set; }
    public int OxygenLevel { get; set; }
    public DateTime LastUpdatedUtc { get; set; } = DateTime.UtcNow;
}
