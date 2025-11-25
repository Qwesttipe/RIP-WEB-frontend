import type { 
  Load, 
  LoadsListResponse, 
  LoadDetailResponse,  
} from '../types';

const API_BASE_URL = '/api';

// Mock данные
const mockLoads: Load[] = [
  {
    id: 1,
    name: "Равномерная нагрузка",
    description: "Расчёт при использовании балансировщиков нагрузки и их штатной работе.",
    image_url: "/images/mock/card1.png",
    consumption: 60 
  },
  {
    id: 2,
    name: "Растущая нагрузка", 
    description: "Расчёт при постепенном и спокойном увеличении затрачиваемых ресурсов сервера.",
    image_url: "/images/mock/card3.png",
    consumption: 100
  },
  {
    id: 3,
    name: "Пиковая нагрузка",
    description: "Расчёт при кратковременном и резком увеличении трафика.",
    image_url: "/images/mock/card2.png", 
    consumption: 180
  },
  {
    id: 4,
    name: "DDoS-нагрузка",
    description: "Расчёт при DDoS-атаке и перегрузке сервера.",
    image_url: "/images/mock/main-page.png", 
    consumption: 300
  }
];


class ApiService {
  private async fetchWithFallback<T>(endpoint: string, mockData: T): Promise<T> {
    try {
      const response = await fetch(``);
      if (!response.ok) throw new Error('API not available');
      return await response.json();
    } catch (error) {
      console.warn('Using mock data due to API error:', error);
      return mockData;
    }
  }

  async getLoads(name?: string, consumption?: string): Promise<LoadsListResponse> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (consumption) params.append('consumption', consumption);
    
    const queryString = params.toString();
    const endpoint = `/loads${queryString ? `?${queryString}` : ''}`;
    
    try {
      const response = await fetch(`http://localhost:8080/api/loads`);
      if (!response.ok) throw new Error('API not available');
      return await response.json();
    } catch (error) {
      console.warn('Using mock data due to API error:', error);
      
    
      let filteredLoads = mockLoads;
      
      // Если есть параметры поиска - фильтруем
      if (name || consumption) {
        filteredLoads = mockLoads.filter(load => {
          let matches = false;
          
          // Поиск по названию (ILIKE)
          if (name && load.name.toLowerCase().includes(name.toLowerCase())) {
            matches = true;
          }
          
          // Поиск по % загрузки (частичное совпадение строки)
          if (consumption && load.consumption.toString().includes(consumption)) {
            matches = true;
          }
          
          return matches;
        });
      }
      
      return { loads: filteredLoads };
    }
  }

  async getLoad(id: number): Promise<LoadDetailResponse> {
    const load = mockLoads.find(a => a.id === id) || mockLoads[0];
    return this.fetchWithFallback(`/loads/${id}`, load);
  }

  // api.ts - обновляем метод getPredictionCart
  async getPredictionCart(): Promise<{ user_id: number; item_count: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions/cart`);
      if (!response.ok) throw new Error('API not available');
      return await response.json();
    } catch (error) {
      console.warn('Using mock cart data due to API error:', error);
      // Возвращаем статические данные при ошибке
      return {
        user_id: -1,
        item_count: 0
      };
    }
}

}

export const apiService = new ApiService();