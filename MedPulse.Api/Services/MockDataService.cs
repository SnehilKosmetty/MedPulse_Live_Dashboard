using MedPulse.Api.Data;
using MedPulse.Api.Models;

namespace MedPulse.Api.Services;

public class MockDataService : IDataService
{
    private readonly List<CaseRecord> _cases = SeedData.Cases;
    private readonly List<AlertRecord> _alerts = SeedData.Alerts;
    private readonly List<MetricPoint> _metrics = [];
    private readonly Dictionary<int, List<MetricPoint>> _caseMetrics = new();
    private readonly object _sync = new();

    public MockDataService()
    {
        for (var i = 20; i >= 1; i--)
        {
            _metrics.Add(CreateMetric(DateTime.UtcNow.AddSeconds(-i * 5)));
        }

        lock (_sync)
        {
            foreach (var c in _cases)
            {
                _caseMetrics[c.Id] = [];
                for (var j = 20; j >= 1; j--)
                {
                    _caseMetrics[c.Id].Add(new MetricPoint
                    {
                        TimestampUtc = DateTime.UtcNow.AddSeconds(-j * 5),
                        HeartRate = Math.Clamp(c.HeartRate + Random.Shared.Next(-4, 5), 65, 130),
                        OxygenLevel = Math.Clamp(c.OxygenLevel + Random.Shared.Next(-2, 2), 86, 100)
                    });
                }
            }
        }
    }

    public DashboardSummary GetSummary()
    {
        lock (_sync)
        {
            return new DashboardSummary
            {
                ActiveCases = _cases.Count,
                CriticalAlerts = _alerts.Count(a => a.Severity == "Critical" && !a.IsAcknowledged),
                AvgHeartRate = (int)Math.Round(_cases.Average(c => c.HeartRate)),
                AvgOxygenLevel = (int)Math.Round(_cases.Average(c => c.OxygenLevel))
            };
        }
    }

    public IReadOnlyList<CaseRecord> GetCases(string? status = null)
    {
        lock (_sync)
        {
            if (string.IsNullOrWhiteSpace(status))
            {
                return _cases.ToList();
            }

            return _cases
                .Where(c => c.Status.Equals(status, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }
    }

    public CaseRecord? GetCaseById(int id)
    {
        lock (_sync)
        {
            return _cases.FirstOrDefault(c => c.Id == id);
        }
    }

    public IReadOnlyList<AlertRecord> GetAlerts(bool onlyActive)
    {
        lock (_sync)
        {
            return onlyActive ? _alerts.Where(a => !a.IsAcknowledged).ToList() : _alerts.ToList();
        }
    }

    public IReadOnlyList<MetricPoint> GetMetricHistory(int count = 20)
    {
        lock (_sync)
        {
            return _metrics.TakeLast(count).ToList();
        }
    }

    public IReadOnlyList<MetricPoint> GetCaseMetricHistory(int caseId, int count = 30)
    {
        lock (_sync)
        {
            if (!_caseMetrics.TryGetValue(caseId, out var list) || list.Count == 0)
            {
                return Array.Empty<MetricPoint>();
            }

            return list.TakeLast(count).ToList();
        }
    }

    public bool TryAcknowledgeAlert(int alertId)
    {
        lock (_sync)
        {
            var alert = _alerts.FirstOrDefault(a => a.Id == alertId);
            if (alert is null)
            {
                return false;
            }

            alert.IsAcknowledged = true;
            return true;
        }
    }

    public MetricPoint PushNextMetric()
    {
        lock (_sync)
        {
            var next = CreateMetric(DateTime.UtcNow);
            _metrics.Add(next);
            if (_metrics.Count > 100)
            {
                _metrics.RemoveAt(0);
            }

            foreach (var record in _cases)
            {
                record.HeartRate = Math.Clamp(record.HeartRate + Random.Shared.Next(-3, 4), 65, 130);
                record.OxygenLevel = Math.Clamp(record.OxygenLevel + Random.Shared.Next(-2, 2), 86, 100);
                record.LastUpdatedUtc = DateTime.UtcNow;

                if (!_caseMetrics.ContainsKey(record.Id))
                {
                    _caseMetrics[record.Id] = [];
                }

                var caseList = _caseMetrics[record.Id];
                caseList.Add(new MetricPoint
                {
                    TimestampUtc = DateTime.UtcNow,
                    HeartRate = record.HeartRate,
                    OxygenLevel = record.OxygenLevel
                });
                if (caseList.Count > 100)
                {
                    caseList.RemoveAt(0);
                }
            }

            return next;
        }
    }

    private static MetricPoint CreateMetric(DateTime timestampUtc)
    {
        return new MetricPoint
        {
            TimestampUtc = timestampUtc,
            HeartRate = Random.Shared.Next(72, 115),
            OxygenLevel = Random.Shared.Next(90, 100)
        };
    }
}
