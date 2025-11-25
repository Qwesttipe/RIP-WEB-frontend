import React from 'react';
import type { LoadShortResponse } from '../types';

interface LoadCardProps {
  load: LoadShortResponse;
  onViewDetails: (id: number) => void;
}

const LoadCard: React.FC<LoadCardProps> = ({ load, onViewDetails }) => {
  const defaultImage = "http://localhost:9000/images/main-page.png";

  const handleAddToPrediction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log('Добавить нагрузку в рассчет:', load.id);
  };

  return (
    <div className="load-card">
      <div 
        className="load-link"
        onClick={() => onViewDetails(load.id)}
      >
        <img 
          src={load.image_url || defaultImage}
          alt={load.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="load-header">
          <h3>{load.name}</h3>
          <button 
            className="add-to-tree-btn"
            title="Добавить в рассчёт"
            onClick={handleAddToPrediction}
          >
            <img src="/images/mock/add-b.png" alt="Добавить" />
          </button>
        </div>
        <div className="consumption">Загрузка сервера (%): {load.consumption}</div>
      </div>
    </div>
  );
};

export default LoadCard;