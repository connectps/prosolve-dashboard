import React, { useState, useEffect } from 'react';

export default function WorkflowTab({ data }) {
  const [cards, setCards] = useState(data || []);
  const [draggedCard, setDraggedCard] = useState(null);

  useEffect(() => {
    setCards(data || []);
  }, [data]);

  const handleDragStart = (e, cardId) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, column) => {
    e.preventDefault();
    if (draggedCard) {
      const updated = cards.map(card =>
        card.id === draggedCard ? { ...card, column } : card
      );
      setCards(updated);
      setDraggedCard(null);
    }
  };

  const columns = ['drafting', 'scheduled', 'posted', 'analyzed'];
  const labels = {
    drafting: '📝 Drafting',
    scheduled: '📅 Scheduled',
    posted: '✅ Posted',
    analyzed: '📊 Analyzed'
  };

  return (
    <div>
      <h3>Monthly Post Workflow</h3>
      <div className="kanban-board">
        {columns.map(column => (
          <div
            key={column}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <div className="kanban-header">{labels[column]}</div>
            <div className="kanban-cards">
              {cards
                .filter(card => card.column === column)
                .map(card => (
                  <div
                    key={card.id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id)}
                  >
                    <div className="kanban-card-headline">{card.headline}</div>
                    {card.engagement && (
                      <div className="kanban-card-engagement">💬 {card.engagement} engagements</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
