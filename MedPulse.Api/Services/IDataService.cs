using MedPulse.Api.Models;

namespace MedPulse.Api.Services;

public interface IDataService
{
    DashboardSummary GetSummary();
    IReadOnlyList<CaseRecord> GetCases(string? status = null);
    CaseRecord? GetCaseById(int id);
    IReadOnlyList<AlertRecord> GetAlerts(bool onlyActive);
    IReadOnlyList<MetricPoint> GetMetricHistory(int count = 20);
    IReadOnlyList<MetricPoint> GetCaseMetricHistory(int caseId, int count = 30);
    bool TryAcknowledgeAlert(int alertId);
    MetricPoint PushNextMetric();
}
