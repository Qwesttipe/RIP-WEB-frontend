# Используем Node.js 22 (LTS) - совместим с Vite 7.1.7
FROM node:22-alpine AS development

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Открываем порт для Vite dev server
EXPOSE 3000

# Команда для разработки
CMD ["npm", "run", "dev"]