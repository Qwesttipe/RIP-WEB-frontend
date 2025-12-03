import React from 'react';
import type { LoadShortResponse } from '../types';
//import { useCart } from '../hooks/useCart';
import defaultImage from '/images/mock/main-page.png';
//import addIcon from '/images/mock/add-b.png';

interface LoadCardProps {
  load: LoadShortResponse;
  onViewDetails: (id: number) => void;
}

const LoadCard: React.FC<LoadCardProps> = ({ load, onViewDetails }) => {

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
        </div>
        <div className="year">Нагрузка системы: {load.consumption} %.</div>
      </div>
    </div>
  );
};

export default LoadCard;