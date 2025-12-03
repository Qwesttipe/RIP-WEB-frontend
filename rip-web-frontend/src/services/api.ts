// services/api.ts
import type { 
  Load, 
  LoadsListResponse, 
  LoadDetailResponse,  
} from '../types';
import { dest_api } from '../target_config'; // ИМПОРТИРУЕМ dest_api

// Mock данные с обновленными путями
const mockLoads: Load[] = [
  {
    id: 1,
    name: "Равномерная нагрузка",
    description: "Расчёт при использовании балансировщиков нагрузки и их штатной работе.",
    image_url: "images/mock/card1.png",
    consumption: 60 
  },
  {
    id: 2,
    name: "Растущая нагрузка", 
    description: "Расчёт при постепенном и спокойном увеличении затрачиваемых ресурсов сервера.",
    image_url: "images/mock/card2.png",
    consumption: 100
  },
  {
    id: 3,
    name: "Пиковая нагрузка",
    description: "Расчёт при кратковременном и резком увеличении трафика.",
    image_url: "images/mock/card3.png", 
    consumption: 180
  },
  {
    id: 3,
    name: "Нагрузка типа DDoS",
    description: "Расчёт при DDoS-атаке и перегрузке сервера.",
    image_url: "images/mock/card4.png", 
    consumption: 300
  }
];

class ApiService {
  private async fetchWithTimeout<T>(url: string, timeout = 5000): Promise<T> { // УВЕЛИЧИЛ ТАЙМАУТ
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        credentials: 'include', // ДОБАВИЛ КУКИ
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async fetchWithFallback<T>(endpoint: string, mockData: T, timeout = 5000): Promise<T> {
    const url = `${dest_api}${endpoint}`; // ИСПОЛЬЗУЕМ dest_api
    console.log(`Fetching: ${url}`); // ДЛЯ ОТЛАДКИ
    
    try {
      return await this.fetchWithTimeout<T>(url, timeout);
    } catch (error) {
      console.warn(`API ${url} failed, using mock data:`, error);
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 100);
      });
    }
  }

  async getLoads(name?: string, consumption?: string): Promise<LoadsListResponse> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (consumption) params.append('consumption', consumption);
    
    const queryString = params.toString();
    const endpoint = `/loads${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchWithFallback(endpoint, this.getMockLoads(name, consumption), 5000);
  }

  async getLoad(id: number): Promise<LoadDetailResponse> {
    return this.fetchWithFallback(`/loads/${id}`, this.getMockLoad(id), 5000);
  }

  async getPredictionCart(): Promise<{ user_id: number; item_count: number }> {
    return this.fetchWithFallback(
      '/predictions/cart', 
      { user_id: -1, item_count: 0 }, 
      5000
    );
  }

  private getMockLoads(name?: string, consumption?: string): LoadsListResponse {
    let filteredLoads = mockLoads;
    
    if (name || consumption) {
      filteredLoads = mockLoads.filter(load => {
        const nameMatch = name ? load.name.toLowerCase().includes(name.toLowerCase()) : false;
        const consumptionMatch = consumption ? load.consumption.toString().includes(consumption) : false;
        return nameMatch || consumptionMatch;
      });
    }
    
    return { loads: filteredLoads };
  }

  private getMockLoad(id: number): LoadDetailResponse {
    return mockLoads.find(a => a.id === id) || mockLoads[0];
  }
}

export const apiService = new ApiService();