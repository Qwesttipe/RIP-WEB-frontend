import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import type { LoadDetailResponse } from '../types';
import { apiService } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const LoadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [Load, setLoad] = useState<LoadDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadLoad(parseInt(id));
    }
  }, [id]);

  const loadLoad = async (LoadId: number) => {
    try {
      setLoading(true);
      const data = await apiService.getLoad(LoadId);
      setLoad(data);
    } catch (error) {
      console.error('Error loading Load details:', error);
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
          <div className="text-center" style={{ color: 'white', padding: '50px' }}>
            Загрузка деталей нагрузки...
          </div>
        </Container>
      </div>
    );
  }

  if (!Load) {
    return (
      <div className="detail-page">
        <Container className="page-container">
          <div className="text-center" style={{ color: 'white', padding: '50px' }}>
            Нагрзка не найдена
          </div>
        </Container>
      </div>
    );
  }

  const defaultImage = "/images/mock/main-page.png";

  return (
    <div className="detail-page">
      <Container className="page-container">
        <div className="breadcrumbs-container">
          <Breadcrumbs items={[
            { label: 'Главная', path: '/' },
            { label: 'Аномальные паттерны', path: '/loads' },
            { label: Load.name }
          ]} />
        </div>

        <div className="detail-header">
          <div className="detail-consumption">Нагрузка на сервер (%): {Load.consumption}</div>
          <Button 
            variant="link" 
            className="close-button"
            onClick={handleBack}
          >
            <img src="/images/mock/close-b.jpg" alt="Закрыть" />
          </Button>
        </div>
        
        <h1 className="detail-title">{Load.name}</h1>
        
        <img 
          src={Load.image_url || defaultImage} 
          alt={Load.name} 
          className="detail-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        
        <div className="detail-info-block">
          {Load.description}
        </div>
      </Container>
    </div>
  );
};

export default LoadDetailPage;