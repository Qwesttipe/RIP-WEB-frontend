import React from 'react';
import type { LoadShortResponse } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToPrediction } from '../slices/predictionSlice';
import { useCart } from '../hooks/useCart';
import defaultImage from '/images/mock/main-page.png';
import addIcon from '/images/mock/add-b.png';

interface LoadCardProps {
  load: LoadShortResponse;
  onViewDetails: (id: number) => void;
}

export const LoadCard: React.FC<LoadCardProps> = ({ load, onViewDetails }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
  const { syncCartWithApi } = useCart();

  // Показывать кнопку только для авторизованных обычных пользователей (не модераторов)
  const shouldShowAddButton = !isLoading && isAuthenticated && user && !user.is_moderator;

  const handleAddToTree = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Для добавления в заявку необходимо войти в систему');
      return;
    }

    try {
      await dispatch(addToPrediction(load.id!)).unwrap();
      await syncCartWithApi();
      console.log('Добавлено в заявку:', load.id);
    } catch (error) {
      console.error('Ошибка при добавлении в заявку:', error);
    }
  };

  return (
    <div className="load-card">
      <div 
        className="load-link"
        onClick={() => onViewDetails(load.id!)}
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
          {/* Кнопка показывается только для авторизованных обычных пользователей */}
          {shouldShowAddButton && (
            <button 
              className="add-to-prediction-btn"
              title="Добавить в заявку"
              onClick={handleAddToTree}
            >
              <img src={addIcon} alt="Добавить" />
            </button>
          )}
        </div>
        <div className="year">Нагрузка: {load.consumption} %</div>
      </div>
    </div>
  );
};

export default LoadCard;
