import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import type { LoadDetailResponse } from '../types';
import { apiService } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [load, setLoad] = useState<LoadDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadLoad(parseInt(id));
    }
  }, [id]);

  const loadLoad = async (loadId: number) => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getLoad(loadId);
      setLoad(data);
    } catch (error) {
      console.error('Error loading load details:', error);
      setError('Не удалось загрузить данные аномалии');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/loads');
  };

  if (loading) {
    return (
      <div className="detail-page">
        <Container className="page-container">
          <LoadingSpinner size="lg" text="Загрузка деталей аномалии..." />
        </Container>
      </div>
    );
  }

  if (error || !load) {
    return (
      <div className="detail-page">
        <Container className="page-container">
          <div className="text-center" style={{ color: '#060F1E', padding: '50px' }}>
            <p>{error || 'Аномалия не найдена'}</p>
            <Button variant="primary" onClick={handleBack}>
              Вернуться к каталогу
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Container className="page-container">
        <div className="breadcrumbs-container">
          <Breadcrumbs items={[
            { label: 'Главная', path: '/' },
            { label: 'Паттерны нагрузок', path: '/loads' },
            { label: load.name }
          ]} />
        </div>

        <div className="detail-header">
          <div className="detail-year">Нагрузка на систему: {load.consumption}г.</div>
          <Button 
            variant="link" 
            className="close-button"
            onClick={handleBack}
          >
            <img src="/images/mock/close-b.jpg" alt="Закрыть" />
          </Button>
        </div>
        
        <h1 className="detail-title">{load.name}</h1>
        
        <img 
          src={load.image_url || '/images/mock/main-page.png'} 
          alt={load.name} 
          className="detail-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/mock/main-page.png';
          }}
        />
        
        <div className="detail-info-block">
          {load.description}
        </div>
      </Container>
    </div>
  );
};

export default LoadDetailPage;