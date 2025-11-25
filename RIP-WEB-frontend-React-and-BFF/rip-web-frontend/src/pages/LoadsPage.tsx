// LoadsPage.tsx - упрощаем работу с корзиной
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import type { LoadShortResponse } from '../types';
import { apiService } from '../services/api';
import LoadCard from '../components/LoadCard';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const LoadsPage: React.FC = () => {
  const [loads, setLoads] = useState<LoadShortResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    loadLoads();
    // Временно добавить для теста
    apiService.getPredictionCart().then(cart => {
      console.log('Cart data:', cart);
    });
  }, []);

  const loadLoads = async (searchName?: string, searchConsumption?: string) => {
    try {
      setLoading(true);
      const response = await apiService.getLoads(searchName, searchConsumption);
      setLoads(response.loads);
    } catch (error) {
      console.error('Error loading loads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadLoads();
      return;
    }

    await loadLoads(searchTerm.trim(), searchTerm.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/loads/${id}`);
  };

  if (loading) {
    return (
      <Container className="page-container">
        <LoadingSpinner size="lg" text="Загрузка нагрузок..." />
      </Container>
    );
  }

  return (
    <Container className="page-container">
      <div className="breadcrumbs-container">
        <Breadcrumbs items={[
          { label: 'Главная', path: '/' },
          { label: 'Виды нагрузок на сервер' }
        ]} />
      </div>

      <h1 className="page-title">виды нагрузок на сервер</h1>

      {/* Поиск и фильтры */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              <img 
                src="/images/mock/search-icon.png" 
                alt="Поиск" 
              />
            </button>
          </div>

          {/* Корзина остается серой и не кликабельной */}
          <div className="tree-icon disabled" title="Корзина временно недоступна">
            <img 
              src="/images/mock/user-icon.jpg" 
              alt="Заявка" 
              className="grayscale"
            />
          </div>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="loads-grid">
        {loads.map(load => (
          <LoadCard 
            key={load.id}
            load={load} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {loads.length === 0 && (
        <div className="text-center" style={{ color: 'white', padding: '50px' }}>
          <p>Нагрузки не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      )}
    </Container>
  );
};

export default LoadsPage;