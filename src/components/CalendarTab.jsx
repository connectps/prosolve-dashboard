import React, { useState, useEffect } from 'react';
import { database, ref, set } from '../firebase';

export default function CalendarTab({ data }) {
  const [posts, setPosts] = useState(data || []);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [newPostHeadline, setNewPostHeadline] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostCopy, setNewPostCopy] = useState('');
  const [saving, setSaving] = useState(false);

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

  const saveToFirebase = async () => {
    setSaving(true);
    try {
      await set(ref(database, 'calendar'), posts);
      alert('✅ Posts saved to Firebase!');
    } catch (error) {
      alert('❌ Error saving to Firebase: ' + error.message);
    } finally {
      setSaving(false);
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
          <div 
            key={dayIndex} 
            className="calendar-day" 
            onDragOver={handleDragOver} 
            onDrop={(e) => handleDrop(e, dayIndex)}
          >
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

  const saveNewPost = () => {
    if (newPostHeadline && newPostCategory && newPostCopy) {
      const newPost = {
        id: Math.max(...posts.map(p => p.id), 0) + 1,
        headline: newPostHeadline,
        category: newPostCategory,
        theme: 'User-created post',
        scheduledDay: null,
        copies: [
          { angle: 'Original', text: newPostCopy },
          { angle: 'Educator-first', text: newPostCopy },
          { angle: 'Bold', text: newPostCopy }
        ]
      };
      
      setPosts([...posts, newPost]);
      setShowAddPost(false);
      setNewPostHeadline('');
      setNewPostCategory('');
      setNewPostCopy('');
      alert('✅ Post created! Drag it to a calendar day, then click "Save Posts" to save permanently.');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h3>Weekly Post Calendar</h3>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button className="add-post-btn" onClick={() => setShowAddPost(true)}>+ Add Post</button>
        <button 
          className="add-post-btn" 
          onClick={saveToFirebase}
          disabled={saving}
          style={{ backgroundColor: saving ? '#ccc' : '#30cfe5' }}
        >
          {saving ? '💾 Saving...' : '💾 Save Posts'}
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-left">
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
              <input 
                type="text" 
                placeholder="Enter post headline"
                value={newPostHeadline}
                onChange={(e) => setNewPostHeadline(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={newPostCategory} onChange={(e) => setNewPostCategory(e.target.value)}>
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
              <label>Copy Text</label>
              <textarea 
                placeholder="Write your copy here. This will be used for all 3 copy variations."
                value={newPostCopy}
                onChange={(e) => setNewPostCopy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  minHeight: '100px'
                }}
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-btn modal-btn-secondary" onClick={() => setShowAddPost(false)}>Cancel</button>
              <button className="modal-btn modal-btn-primary" onClick={saveNewPost}>Create Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
