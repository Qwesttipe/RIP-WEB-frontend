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
  load_id: number;
  load_name: string;
  load_image: string;
  anomalous_rings: string;
  calculated_consumption: number;
}

export interface PredictionDetailResponse {
  prediction: {
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

