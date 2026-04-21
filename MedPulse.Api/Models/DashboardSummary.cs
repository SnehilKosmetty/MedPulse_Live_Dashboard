namespace MedPulse.Api.Models;

public class DashboardSummary
{
    public int ActiveCases { get; set; }
    public int CriticalAlerts { get; set; }
    public int AvgHeartRate { get; set; }
    public int AvgOxygenLevel { get; set; }
}
