import React, { useState } from 'react';

export default function IntelligenceTab({ data }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const intelligence = data || [];

  const renderTopPosts = () => {
    const card = intelligence.find(c => c.id === selectedCard);
    if (!card || !card.topPosts || card.topPosts.length === 0) {
      return null;
    }

    return (
      <div className="modal-overlay active">
        <div className="modal">
          <button className="modal-close" onClick={() => setSelectedCard(null)}>&times;</button>
          <div className="modal-title">{card.metric} - Top Posts</div>
          <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {card.postCount} posts analyzed • Avg engagement: {card.avgEngagement}/post
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {card.topPosts.map((post, idx) => (
              <div key={idx} style={{
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#333' }}>
                  <strong>Post {idx + 1}</strong>
                </div>
                <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', lineHeight: '1.5', color: '#666' }}>
                  {post.text}
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#30cfe5', fontWeight: '600' }}>
                  <span>👍 {post.likes} likes</span>
                  <span>💬 {post.comments} comments</span>
                  <span>🔄 {post.reposts} reposts</span>
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>Total: {post.engagement}</span>
                </div>
                {post.url && (
                  <a href={post.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#30cfe5',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}>
                    View on LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Competitor Intelligence</h3>
      <div className="intelligence-grid">
        {intelligence.map(item => (
          <div 
            key={item.id} 
            className="intel-card"
            onClick={() => item.topPosts && item.topPosts.length > 0 ? setSelectedCard(item.id) : null}
            style={{ 
              cursor: item.topPosts && item.topPosts.length > 0 ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (item.topPosts && item.topPosts.length > 0) {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(48, 207, 229, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="intel-title">{item.title}</div>
            <div className="intel-metric">{item.metric}</div>
            <div className="intel-label">{item.label}</div>
            <div className="intel-content">{item.content}</div>
            {item.topPosts && item.topPosts.length > 0 && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#30cfe5', fontWeight: '600' }}>
                ↓ Click to see top posts
              </div>
            )}
          </div>
        ))}
      </div>

      {renderTopPosts()}
    </div>
  );
}
