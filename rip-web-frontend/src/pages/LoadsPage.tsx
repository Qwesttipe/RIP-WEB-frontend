import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import type { LoadShortResponse } from '../types';
import { apiService } from '../services/api';
import LoadCard from '../components/LoadCard';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { useCart } from '../hooks/useCart';


const LoadsPage: React.FC = () => {
  const [loads, setLoads] = useState<LoadShortResponse[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { 
    searchTerm, 
    updateSearchTerm, 
    saveSearchToHistory
  } = useSearch();
  
  const { syncCartWithApi } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматически применяем сохраненный поиск и синхронизируем корзину
    loadLoadsWithCurrentSearch();
    syncCartWithApi();
  }, []);

  const loadLoadsWithCurrentSearch = async () => {
    if (searchTerm.trim()) {
      await loadLoads(searchTerm.trim(), searchTerm.trim());
    } else {
      await loadLoads();
    }
  };

  const loadLoads = async (searchName?: string, searchСonsumption?: string) => {
    try {
      setLoading(true);
      const response = await apiService.getLoads(searchName, searchСonsumption);
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

    saveSearchToHistory(searchTerm);
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
        <LoadingSpinner size="lg" text="Загрузка аномалий..." />
      </Container>
    );
  }

  return (
    <Container className="page-container">
      <div className="breadcrumbs-container">
        <Breadcrumbs items={[
          { label: 'Главная', path: '/' },
          { label: 'Аномальные паттерны' }
        ]} />
      </div>

      <h1 className="page-title">Нагрузки в расчёте</h1>

      {/* Поиск и фильтры */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => updateSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src="/images/mock/search-icon.png" alt="Поиск" />
            </button>
          </div>

          {/* Корзина всегда справа от поиска */}
          <div className="tree-icon-container">
            <div className="tree-icon disabled" title="Корзина временно недоступна">
              <img 
                src="/images/mock/user-icon.jpg" 
                alt="Заявка" 
                className="grayscale"
              />
            </div>
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