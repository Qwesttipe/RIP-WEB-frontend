import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import type { LoadShortResponse } from '../types';
import { api } from '../api';
import LoadCard from '../components/LoadCard';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import searchIcon from '/images/mock/search-icon.png';
import userIcon from '/images/mock/user-icon.jpg';

const LoadsPage: React.FC = () => {
  const [loads, setLoads] = useState<LoadShortResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [draftPrediction, setDraftPrediction] = useState<any>(null);
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  
  const { 
    searchTerm, 
    updateSearchTerm, 
    saveSearchToHistory 
  } = useSearch();
  
  const { syncCartWithApi, itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const isModerator = user?.is_moderator === true;

  useEffect(() => {
    loadLoadsWithCurrentSearch();
    if (isAuthenticated && !isModerator) {
      syncCartWithApi();
      loadUserPredictions();
    }
  }, [isAuthenticated, isModerator]);

  // Обновляем список заявок при изменении корзины
  useEffect(() => {
    if (isAuthenticated && !isModerator && itemCount > 0) {
      loadUserPredictions();
    }
  }, [itemCount, isAuthenticated, isModerator]);

  const loadUserPredictions = async () => {
    try {
      setPredictionsLoading(true);
      const response = await api.api.predictionsList();
      const predictions = response.data.predictions || [];
      
      const draft = predictions.find(prediction => prediction.status === 'черновик');
      setDraftPrediction(draft || null);
      
      console.log('📋 Загружены заявки пользователя:', predictions);
      console.log('📝 Черновик:', draft);
    } catch (error) {
      console.error('Error loading user predictions:', error);
      setDraftPrediction(null);
    } finally {
      setPredictionsLoading(false);
    }
  };

  const loadLoadsWithCurrentSearch = async () => {
    if (searchTerm.trim()) {
      await loadLoads(searchTerm.trim(), searchTerm.trim());
    } else {
      await loadLoads();
    }
  };

  const loadLoads = async (searchName?: string, searchConsumption?: string) => {
    try {
      setLoading(true);
      const response = await api.api.loadsList({ name: searchName, consumption: searchConsumption });
      setLoads(response.data.loads || []);
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

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ - без использования predictionsCreate
  const handleCartClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isModerator) {
      console.log('🚫 Модераторам запрещено создавать заявки');
      return;
    }

    if (predictionsLoading) {
      console.log('⏳ Заявки еще загружаются...');
      return;
    }

    // Если есть черновик - открываем его
    if (draftPrediction) {
      console.log('📂 Открываем существующий черновик:', draftPrediction.id);
      navigate(`/predictions/${draftPrediction.id}`);
    } else {
      // Если черновика нет, но есть аномалии в корзине - переходим на страницу заявок
      if (itemCount > 0) {
        console.log('🛒 Есть аномалии в корзине, переходим к заявкам');
        navigate('/predictions');
      } else {
        // Если корзина пустая - тоже переходим на страницу заявок
        console.log('📝 Переходим к созданию заявки');
        navigate('/predictions');
      }
    }
  };

  // Иконка активна если есть черновик ИЛИ есть аномалии в корзине
  const isCartActive = isAuthenticated && !isModerator && !predictionsLoading && (draftPrediction || itemCount > 0);

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
          { label: 'Аномальные нагрузки' }
        ]} />
      </div>

      <h1 className="page-title">аномальные нагрузки на сервер</h1>

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
              <img src={searchIcon} alt="Поиск" />
            </button>
          </div>
          
          {/* Иконка корзины */}
          <div className="prediction-icon-container">
            <div 
              className={`prediction-icon ${!isCartActive ? 'disabled' : ''}`}
              onClick={handleCartClick}
              title={
                isModerator 
                  ? "Модераторам запрещено создавать заявки" 
                  : !isAuthenticated 
                    ? "Войдите для доступа к заявке" 
                    : predictionsLoading 
                      ? "Загрузка заявок..." 
                      : draftPrediction 
                        ? "Моя заявка (черновик)" 
                        : itemCount > 0
                          ? "Перейти к созданию заявки"
                          : "Создать новую заявку"
              }
            >
              <img 
                src={userIcon} 
                alt="Моя заявка" 
                className={!isCartActive ? "grayscale" : ""}
              />
              {isAuthenticated && itemCount > 0 && (
                <div className="prediction-count">
                  {itemCount > 9 ? '9+' : itemCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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