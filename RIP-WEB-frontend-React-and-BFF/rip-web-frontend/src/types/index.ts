export interface Load {
  id: number;
  name: string;
  description: string;
  image_url: string;
  consumption: number;
}

export interface LoadsListResponse {
  loads: LoadShortResponse[];
}

export interface LoadShortResponse {
  id: number;
  name: string;
  image_url: string;
  consumption: number;
}

export interface LoadDetailResponse {
  id: number;
  name: string;
  description: string;
  image_url: string;
  consumption: number;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PredictionItem {
  Load_id: number;
  Load_name: string;
  Load_image: string;
  serv_num: string;
  calculated_consumption: number;
}

export interface PredictionDetailResponse {
  Prediction: {
    id: number;
    description: string;
    total_rings: number;
    final_consumption: number;
    status: string;
    creator_id: number;
  };
  predictionItems: PredictionItem[];
}

export interface LoadShortResponse {
  id: number;
  name: string;
  image_url: string;
  consumption: number;
}