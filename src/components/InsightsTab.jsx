import React, { useState } from 'react';

export default function InsightsTab({ data }) {
  const [showReport, setShowReport] = useState(false);

  const metrics = [
    { key: 'engagementRate', label: 'Engagement Rate', value: data?.engagementRate || '3.0%', change: '+0.8% vs last month' },
    { key: 'impressions', label: 'Total Impressions', value: data?.impressions || '1,636', change: '+24% vs last month' },
    { key: 'followers', label: 'New Followers', value: data?.followers || '12', change: '+3 vs last month' }
  ];

  return (
    <div>
      <h3>Performance Overview</h3>
      <div className="insights-grid">
        {metrics.map(metric => (
          <div key={metric.key} className="insight-card" onClick={() => setShowReport(true)}>
            <div className="insight-label">{metric.label}</div>
            <div className="insight-value">{metric.value}</div>
            <div className="insight-change">{metric.change}</div>
            <button className="view-report-btn">View Full Report</button>
          </div>
        ))}
      </div>

      {showReport && (
        <div className="modal-overlay active">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowReport(false)}>&times;</button>
            <div className="modal-title">May 2026 Performance Report</div>
            <p><strong>Summary:</strong> Strong month with solid engagement across product and thought leadership content. CTR exceeded benchmarks at 17.8%.</p>
            <p style={{ marginTop: '1rem', marginBottom: '1rem' }}><strong>Key Metrics:</strong> 1,636 impressions • 49 engagements • 3.0% engagement rate • 12 new followers</p>
            <p><strong>What Worked:</strong> High CTR on product feature + educator angle. Mid-month timing drove peak engagement. Back-to-school messaging resonated.</p>
            <p style={{ marginTop: '0.75rem' }}><strong>What Didn't Work:</strong> Low post cadence kept impressions below benchmark. Afterschool content underperformed. Comments and reposts near zero.</p>
            <p style={{ marginTop: '0.75rem' }}><strong>Recommendations:</strong> Increase cadence to 3-4 posts/week. Lead with back-to-school messaging in June. Test video content for higher engagement.</p>
          </div>
        </div>
      )}
    </div>
  );
}
