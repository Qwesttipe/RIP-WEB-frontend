import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import * as predictionActions from '../slices/predictionSlice.ts';

const {
  fetchPredictionById,
  updatePrediction,
  removeFromPrediction,
  submitPrediction,
  updatePredictionItem,
  setPredictionLocalData,
  clearPredictionLocalData
} = predictionActions;
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';
import type { PredictionDetailResponse, PredictionItemResponse } from '../types';
import defaultImage from '/images/mock/main-page.png';
import confirmIcon from '/images/mock/confirm-icon.png';
import deleteIcon from '/images/mock/delete-icon.png';

const PredictionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentPrediction, isLoading, error, localPredictionData } = useAppSelector((state) => state.predictions);
  const { user } = useAppSelector((state) => state.auth);
  
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [anomalousRings, setAnomalousRings] = useState('');

  const predictionId = id ? parseInt(id) : 0;
  const localData = localPredictionData?.[predictionId] || {
    description: '',
    totalRings: '',
    anomalousRings: {}
  };

  const predictionDetail = currentPrediction as PredictionDetailResponse | null;
  const prediction = predictionDetail?.prediction;
  const predictionItems = predictionDetail?.predictionItems || [];

  const predictionStatus = prediction?.status || 'черновик';
  const isDraft = predictionStatus === 'черновик';
  const isOwner = prediction?.creator_id === user?.id;
  const canEdit = isDraft && isOwner;

  useEffect(() => {
    if (id) {
      dispatch(fetchPredictionById(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleDescriptionChange = (value: string) => {
    if (!id) return;
    dispatch(setPredictionLocalData({
      predictionId: parseInt(id),
      description: value
    }));
  };

  const handleTotalRingsChange = (value: string) => {
    if (!id) return;
    const numericValue = value.replace(/[^0-9]/g, '');
    dispatch(setPredictionLocalData({
      predictionId: parseInt(id),
      totalRings: numericValue
    }));
  };

  const handleSavePredictionData = async () => {
    if (!id) return;
    
    try {
      await dispatch(updatePrediction({
        predictionId: parseInt(id),
        data: {
          description: localData.description,
          total_rings: parseInt(localData.totalRings) || 0
        }
      })).unwrap();
      console.log('✅ Данные заявки сохранены');
    } catch (error) {
      console.error('❌ Ошибка сохранения данных заявки:', error);
    }
  };

  const handleEditItem = (item: PredictionItemResponse) => {
    setEditingItem(item.load_id!);
    const ringsToEdit = localData.anomalousRings[item.load_id!] || item.anomalous_rings || '';
    setAnomalousRings(ringsToEdit);
  };

  const handleSaveItem = async (loadId: number) => {
    if (!id) return;
    
    try {
      await dispatch(updatePredictionItem({
        predictionId: parseInt(id),
        loadId,
        anomalousRings
      })).unwrap();
      
      dispatch(setPredictionLocalData({
        predictionId: parseInt(id),
        anomalousRings: {
          ...localData.anomalousRings,
          [loadId]: anomalousRings
        }
      }));
      
      setEditingItem(null);
      console.log('✅ Аномальные кольца сохранены');
    } catch (error) {
      console.error('❌ Error updating item:', error);
    }
  };

  const handleRemoveItem = async (loadId: number) => {
    if (!id) return;
    
    try {
      await dispatch(removeFromPrediction({
        predictionId: parseInt(id),
        loadId
      })).unwrap();
      
      const updatedRings = { ...localData.anomalousRings };
      delete updatedRings[loadId];
      dispatch(setPredictionLocalData({
        predictionId: parseInt(id),
        anomalousRings: updatedRings
      }));
      
      dispatch(fetchPredictionById(parseInt(id)));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleSubmitPrediction = async () => {
    if (!id) return;
    
    try {
      await dispatch(submitPrediction(parseInt(id))).unwrap();
      dispatch(clearPredictionLocalData(parseInt(id)));
      navigate('/predictions');
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };

  // ФУНКЦИЯ ОЧИСТКИ ЗАЯВКИ - ПРОСТАЯ КНОПКА БЕЗ ПОДТВЕРЖДЕНИЙ
  const handleClearPrediction = async () => {
    if (!id || !prediction) return;
    
    try {
      // Удаляем все аномалии из заявки
      for (const item of predictionItems) {
        await dispatch(removeFromPrediction({
          predictionId: parseInt(id),
          loadId: item.load_id!
        })).unwrap();
      }
      
      // Очищаем локальные данные
      dispatch(setPredictionLocalData({
        predictionId: parseInt(id),
        description: '',
        totalRings: '',
        anomalousRings: {}
      }));
      
      // Обновляем заявку
      dispatch(fetchPredictionById(parseInt(id)));
      
      console.log('✅ Заявка очищена');
    } catch (error) {
      console.error('❌ Ошибка очистки заявки:', error);
    }
  };

  const getDisplayRings = (item: PredictionItemResponse): string => {
    return localData.anomalousRings[item.load_id!] || item.anomalous_rings || '';
  };

  const getDisplayYear = (item: PredictionItemResponse): string => {
    if (item.calculated_consumption) {
      return `${item.calculated_consumption} г.`;
    }
    return 'Не рассчитан';
  };

  const getFinalYearDisplay = (): string => {
    if (prediction?.final_consumption) {
      return `${prediction.final_consumption} г.`;
    }
    return 'Не рассчитан';
  };

  if (isLoading) {
    return <LoadingSpinner text="Загрузка заявки..." />;
  }

  if (!predictionDetail || !prediction) {
    return (
      <Container className="page-container">
        <div className="text-center">
          <h3>Заявка не найдена</h3>
          <button onClick={() => navigate('/predictions')} className="btn-action-primary">
            Вернуться к списку заявок
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="prediction-detail-page">
      <Container className="prediction-detail-container">
        {/* ХЛЕБНЫЕ КРОШКИ: Главная / Каталог аномалий / Моя заявка */}
        <Breadcrumbs items={[
          { label: 'Главная', path: '/' },
          { label: 'Каталог нагрузок', path: '/loads' },
          { label: 'Моя заявка' }
        ]} />

        <div className="page-content-with-margin">
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Кнопка подтверждения заявки для пользователя */}
          {canEdit && predictionItems.length > 0 && (
            <div className="d-flex justify-content-end mb-4">
              <button 
                onClick={handleSubmitPrediction}
                className="btn-action-primary"
              >
                <img src={confirmIcon} alt="Подтвердить заявку" className="button-icon" />
                Подтвердить заявку
              </button>
            </div>
          )}

          {/* Общая информация о заявке */}
          <div className="request-general-info">
            <div className="general-info-card">
              <div className="info-header">
                <span className="info-label">Описание</span>
              </div>
              <textarea
                rows={3}
                value={localData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Опишите че-нить..."
                className="info-value-editable"
                disabled={!canEdit}
              />
            </div>
            
            <div className="general-info-card">
              <div className="info-header">
                <span className="info-label">Число колец!!!!!!!!!!</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={localData.totalRings}
                onChange={(e) => handleTotalRingsChange(e.target.value)}
                placeholder="Введите количество колец"
                className="info-value-editable"
                disabled={!canEdit}
              />
            </div>
            
            <div className="general-info-card">
              <div className="info-header">
                <span className="info-label">ИТОГОВЫЙ ГОД</span>
              </div>
              <div className="info-value-input">
                {getFinalYearDisplay()}
              </div>
            </div>

            {/* ОБЩАЯ КНОПКА СОХРАНЕНИЯ */}
            {canEdit && (
              <div className="general-info-card">
                <div className="info-header">
                  <span className="info-label">СОХРАНЕНИЕ ДАННЫХ</span>
                </div>
                <button 
                  onClick={handleSavePredictionData}
                  className="btn-save-large"
                >
                  💾 Сохранить описание и число колец
                </button>
              </div>
            )}
          </div>

          {/* Заголовки столбцов */}
          <div className="requests-header">
            <div className="requests-column">Нагрузка</div>
            <div className="requests-column">Желаемая загрузка cpu</div>
            <div className="requests-column">Рассчитанные мощности</div>
            {canEdit && <div className="requests-column">ДЕЙСТВИЯ</div>}
          </div>

          {/* Таблица с заявками */}
          <div className="requests-container">
            {predictionItems.length > 0 ? (
              predictionItems.map((item) => (
                <div key={item.load_id} className="request-item">
                  <div className="request-info-section load-section">
                    <div className="request-image">
                      <img 
                        src={item.load_image || defaultImage} 
                        alt={item.load_name}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = defaultImage;
                        }}
                      />
                    </div>
                    <div className="load-name">
                      {item.load_name}
                    </div>
                  </div>
                  
                  <div className="request-info-section">
                    {editingItem === item.load_id ? (
                      <div className="editing-container">
                        <input
                          type="text"
                          value={anomalousRings}
                          onChange={(e) => setAnomalousRings(e.target.value)}
                          placeholder="Пример: 1,5,6"
                          className="anomalous-rings-input"
                          autoFocus
                        />
                        <button 
                          onClick={() => handleSaveItem(item.load_id!)}
                          className="btn-save-inline"
                        >
                          Сохранить
                        </button>
                      </div>
                    ) : (
                      <div 
                        className={`editable-field ${canEdit ? 'clickable' : ''}`}
                        onClick={() => canEdit && handleEditItem(item)}
                      >
                        {getDisplayRings(item)}
                      </div>
                    )}
                  </div>
                  
                  <div className="request-info-section">
                    <div className="calculated-year">
                      {getDisplayYear(item)}
                    </div>
                  </div>

                  {canEdit && (
                    <div className="request-info-section actions-section">
                      <button
                        onClick={() => handleRemoveItem(item.load_id!)}
                        className="icon-button delete-button"
                        title="Удалить аномалию"
                      >
                        <img src={deleteIcon} alt="Удалить" className="button-icon" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-items">
                <p>Нет аномалий в заявке</p>
              </div>
            )}
          </div>

          {/* Кнопки действий внизу - ОЧИСТКА ЗАЯВКИ */}
          {canEdit && (
            <div className="action-buttons-container">
              {predictionItems.length > 0 && (
                <button 
                  onClick={handleClearPrediction}
                  className="btn-action-outline"
                >
                  <img src={deleteIcon} alt="Очистить заявку" className="button-icon" />
                  Очистить заявку
                </button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PredictionDetailPage;