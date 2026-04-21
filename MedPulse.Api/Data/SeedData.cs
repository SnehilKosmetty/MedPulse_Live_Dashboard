using MedPulse.Api.Models;

namespace MedPulse.Api.Data;

public static class SeedData
{
    public static List<CaseRecord> Cases =>
    [
        new() { Id = 1, PatientName = "Amelia Hayes", DeviceId = "MD-1001", Status = "Stable", HeartRate = 78, OxygenLevel = 98 },
        new() { Id = 2, PatientName = "Noah Patel", DeviceId = "MD-1002", Status = "Monitoring", HeartRate = 92, OxygenLevel = 95 },
        new() { Id = 3, PatientName = "Olivia Brooks", DeviceId = "MD-1003", Status = "Critical", HeartRate = 121, OxygenLevel = 89 },
        new() { Id = 4, PatientName = "Mason Kim", DeviceId = "MD-1004", Status = "Stable", HeartRate = 72, OxygenLevel = 99 }
    ];

    public static List<AlertRecord> Alerts =>
    [
        new() { Id = 1, CaseId = 3, Severity = "Critical", Message = "Oxygen level dropped below 90%", IsAcknowledged = false },
        new() { Id = 2, CaseId = 2, Severity = "Medium", Message = "Sustained elevated heart rate", IsAcknowledged = false },
        new() { Id = 3, CaseId = 1, Severity = "Low", Message = "Battery swap reminder for bedside device", IsAcknowledged = true }
    ];
}
