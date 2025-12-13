import React from 'react';
import { Container } from 'react-bootstrap';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Декоративные элементы */}
      <div className="decoration decoration-left"></div>
      <div className="decoration decoration-right"></div>
      
      <Container className="page-container">
        <div className="home-page-content">
          <div className="hero-section">
            <h1 className="hero-title">
              Прогноз нагрузки на сервер
            </h1>
            <p className="hero-subtitle">
              Расчёт нагрузки с учётом технических возможностей сервера. 
              Не знаете, какие вычислительные мощности сервера необходимы для поддержания
              стабильной работы? Попробуйте наш сервис!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;