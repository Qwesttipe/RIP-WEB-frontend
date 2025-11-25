import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Декоративные элементы: теперь две боковые панели (слева и справа) */}
      <div className="decoration decoration-left"></div>
      <div className="decoration decoration-right"></div>
      
      <Container className="page-container"> {/* ДОБАВЬТЕ ЭТОТ КОНТЕЙНЕР */}
        <div className="home-page-content">
          <div className="hero-section">
            <h1 className="hero-title">
              РАССЧЁТ НАГРУЗКИ НА СЕРВЕР
            </h1>
            <p className="hero-subtitle">
              Рассчёт нагрузки с учётом технических возможностей сервера. 
              Не знаете, какие вычислительные мощности сервера необходимы для поддержания
              стабильной работы? Попробуйте наш сервис!
            </p>
            <div className="hero-buttons">
              <Button
                className="hero-button"
                onClick={() => navigate('/loads')}
              >
                Каталог нагрузочных рассчётов
              </Button>
              {/*
              <Button
                className="hero-button secondary"
                onClick={() => navigate('/my-request')}
              >
                Моя заявка
              </Button>
              */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;