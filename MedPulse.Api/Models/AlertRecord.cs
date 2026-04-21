namespace MedPulse.Api.Models;

public class AlertRecord
{
    public int Id { get; set; }
    public int CaseId { get; set; }
    public string Severity { get; set; } = "Medium";
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public bool IsAcknowledged { get; set; }
}
