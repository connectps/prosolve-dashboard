import React from 'react';

export default function IntelligenceTab({ data }) {
  const intelligence = data || [
    {
      id: 1,
      title: 'Top Competitor Theme',
      metric: 'Back-to-school',
      label: '3 posts',
      content: 'All major competitors leaning into back-to-school (Wayfinder, CharacterStrong, Second Step). Avg engagement: 15.2. Opportunity: Lead early with differentiated angle.'
    },
    {
      id: 2,
      title: 'Avg Engagement by Competitor',
      metric: 'CharacterStrong',
      label: '17 engagements/post',
      content: 'CharacterStrong leading (17/post). Wayfinder: 10.8/post. Second Step: 1.2/post. ProSolve: 12.3/post. Edge: longer copy + educator CTAs.'
    },
    {
      id: 3,
      title: 'Emerging Trend',
      metric: 'Video Content',
      label: 'Up 40% this month',
      content: 'Video posts outperforming static 2:1. Recommendation: Test video in June campaign.'
    },
    {
      id: 4,
      title: 'Lowest Engagement',
      metric: 'Afterschool',
      label: '2.1 avg engagement',
      content: 'Even competitors struggle with afterschool content. Recommendation: Reduce afterschool focus, increase school-day and PD.'
    }
  ];

  return (
    <div>
      <h3>Competitor Intelligence</h3>
      <div className="intelligence-grid">
        {intelligence.map(item => (
          <div key={item.id} className="intel-card">
            <div className="intel-title">{item.title}</div>
            <div className="intel-metric">{item.metric}</div>
            <div className="intel-label">{item.label}</div>
            <div className="intel-content">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
