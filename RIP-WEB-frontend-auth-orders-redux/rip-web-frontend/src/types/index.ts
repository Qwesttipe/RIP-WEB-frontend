// types/index.ts
// Re-export types from generated API
export type {
  HandlerLoadShortResponse as LoadShortResponse,
  HandlerLoadDetailResponse as LoadDetailResponse,
  HandlerLoadsListResponse as AnomaliesListResponse,
  //HandlerPredictionShortResponse as PredictionShortResponse, // УДАЛИТЬ этот re-export если создаем свой
  HandlerPredictionDetailResponse as PredictionDetailResponse,
  HandlerPredictionResponse as PredictionResponse,
  HandlerPredictionItemResponse as PredictionItemResponse,
  HandlerPredictionsListResponse as PredictionsListResponse,
  HandlerPredictionCartResponse as PredictionCartResponse,
  HandlerUserResponse as UserResponse,
  HandlerLoginRequest as LoginRequest,
  HandlerRegisterRequest as RegisterRequest,
  HandlerLoginResponse as LoginResponse,
  HandlerAddToPredictionRequest as AddToPredictionRequest,
  HandlerUpdatePredictionItemRequest as UpdatePredictionItemRequest,
  HandlerUpdatePredictionRequest as UpdatePredictionRequest,
  HandlerCompletePredictionRequest as CompletePredictionRequest,
} from '../api/Api';

// Additional types for Redux state
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SearchState {
  searchTerm: string;
  searchYear: string;
  filters: {
    yearFrom?: string;
    yearTo?: string;
    type?: string;
  };
  recentSearches: string[];
}

// Расширенный интерфейс для PredictionShortResponse с дополнительными полями
export interface PredictionShortResponse {
  id?: number;
  amount_of_anomalies?: number;
  creator?: string;
  moderator?: string;
  final_year?: number;
  status?: string;
  completed_anomalies?: number;
}