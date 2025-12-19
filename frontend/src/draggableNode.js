
import { useState } from 'react';

export const DraggableNode = ({ type, label, icon }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm cursor-grab active:cursor-grabbing transition-all duration-300"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={{
        background: '#420c86',
        border: '1px solid rgba(124, 58, 237, 0.5)',
        color: '#e0e0e0',
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        opacity: isDragging ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.background = '#5a1bb8';
          e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.8)';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 12, 134, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.background = '#420c86';
          e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.5)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
};