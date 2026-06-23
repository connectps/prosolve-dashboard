import React, { useState, useEffect } from 'react';

export default function CalendarTab({ data }) {
  const [posts, setPosts] = useState(data || []);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);

  useEffect(() => {
    setPosts(data || []);
  }, [data]);

  const handleDragStart = (e, postId) => {
    setDraggedCard(postId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dayNumber) => {
    e.preventDefault();
    if (draggedCard) {
      const updated = posts.map(post =>
        post.id === draggedCard ? { ...post, scheduledDay: dayNumber } : post
      );
      setPosts(updated);
      setDraggedCard(null);
    }
  };

  const renderCalendarGrid = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weeks = 4;
    const cells = [];

    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 5; day++) {
        const dayIndex = (week * 5) + day + 1;
        const dayName = days[day];
        const dateOffset = (week * 7) + (day + 1);
        const date = new Date(2026, 5, 23 + dateOffset);
        const dateStr = (date.getMonth() + 1) + '/' + date.getDate();

        const postsOnDay = posts.filter(p => p.scheduledDay === dayIndex);

        cells.push(
          <div key={dayIndex} className="calendar-day" onDragOver={handleDragOver} onDrop={(e) => {
            e.preventDefault();
            handleDrop(e, dayIndex);
          }}>
            <div className="calendar-day-header">{dayName}</div>
            <div className="calendar-day-date">{dateStr}</div>
            <div className="calendar-slots">
              {postsOnDay.length > 0 ? (
                postsOnDay.map(post => (
                  <div key={post.id} onClick={() => setSelectedPost(post.id)}>
                    <div
                      className="calendar-post-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, post.id)}
                    >
                      <div className="calendar-post-headline">{post.headline?.substring(0, 25)}...</div>
                      <span className={`calendar-post-tag ${getCategoryClass(post.category)}`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="calendar-slot"></div>
              )}
            </div>
          </div>
        );
      }
    }

    return cells;
  };

  const getCategoryClass = (catId) => `cat-${catId}`;

  const getCategoryLabel = (catId) => {
    const labels = {
      'product': 'Product',
      'thought-leadership': 'Thought Leadership',
      'pol': 'PoL',
      'pd': 'PD',
      'afterschool': 'Afterschool',
      'school-day': 'School Day',
      'events': 'Events'
    };
    return labels[catId] || '';
  };

  const renderCopyPanel = () => {
    if (!selectedPost) {
      return <div className="copy-panel-empty">Select a post to see copy drafts</div>;
    }

    const post = posts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <>
        <div className="copy-panel-header">📝 Copy Drafts</div>
        <div style={{ fontSize: '0.85rem', marginBottom: '1rem', color: '#666', lineHeight: '1.5', fontWeight: '500' }}>
          {post.headline}
        </div>
        {post.copies?.map((copy, idx) => (
          <div key={idx} className="copy-variation">
            <div className="copy-angle">{copy.angle}</div>
            <div className="copy-text">{copy.text}</div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <h3>Weekly Post Calendar</h3>
      <div className="calendar-container">
        <div className="calendar-left">
          <button className="add-post-btn" onClick={() => setShowAddPost(true)}>+ Add Post</button>
          <div className="calendar-grid">
            {renderCalendarGrid()}
          </div>
        </div>
        <div className="copy-panel">
          {renderCopyPanel()}
        </div>
      </div>

      {showAddPost && (
        <div className="modal-overlay active">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowAddPost(false)}>&times;</button>
            <div className="modal-title">Create New Post</div>
            <div className="form-group">
              <label>Post Headline</label>
              <input type="text" placeholder="Enter post headline" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select>
                <option value="">Select a category</option>
                <option value="product">Product</option>
                <option value="thought-leadership">Thought Leadership</option>
                <option value="pol">PoL</option>
                <option value="pd">PD</option>
                <option value="afterschool">Afterschool</option>
                <option value="school-day">School Day</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div className="form-group">
              <label>Theme/Topic</label>
              <input type="text" placeholder="What is this post about?" />
            </div>
            <div className="modal-buttons">
              <button className="modal-btn modal-btn-secondary" onClick={() => setShowAddPost(false)}>Cancel</button>
              <button className="modal-btn modal-btn-primary" onClick={() => { setShowAddPost(false); alert('Post created!'); }}>Create Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
