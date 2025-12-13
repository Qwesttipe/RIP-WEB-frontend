import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'
import type { 
  PredictionShortResponse, 
  PredictionDetailResponse,
  UpdatePredictionRequest
} from '../types'

export interface PredictionLocalData {
  description: string;
  totalRings: string;
  anomalousRings: Record<number, string>;
}

export interface PredictionState {
  predictions: PredictionShortResponse[]
  currentPrediction: PredictionDetailResponse | null
  isLoading: boolean
  error: string | null
  localPredictionData: {
    [predictionId: number]: PredictionLocalData
  }
}

const initialState: PredictionState = {
  predictions: [],
  currentPrediction: null,
  isLoading: false,
  error: null,
  localPredictionData: {}
}

// Для пользователя - загружаем все его заявки без фильтров
export const fetchUserPredictions = createAsyncThunk(
  'predictions/fetchUserPredictions',
  async (filters: { status?: string; date_from?: string; date_to?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.api.predictionsList(filters)
      return response.data.predictions || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка загрузки заявок')
    }
  }
)

export const fetchModeratorPredictions = createAsyncThunk(
  'predictions/fetchModeratorPredictions',
  async (filters: { status?: string; date_from?: string; date_to?: string } | undefined, { rejectWithValue }) => {
    try {
      const response = await api.api.predictionsList(filters)
      return response.data.predictions || []
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка загрузки заявок')
    }
  }
)

export const fetchPredictionById = createAsyncThunk(
  'predictions/fetchPredictionById',
  async (predictionId: number, { rejectWithValue }) => {
    try {
      const response = await api.api.predictionsDetail(predictionId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка загрузки заявки')
    }
  }
)

export const addToPrediction = createAsyncThunk(
  'predictions/addToPrediction',
  async (loadId: number, { rejectWithValue }) => {
    try {
      const response = await api.api.predictionsCurrentItemsCreate({ load_id: loadId })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка добавления в заявку')
    }
  }
)

// ОБНОВЛЕНИЕ АНОМАЛЬНЫХ КОЛЕЦ
export const updatePredictionItem = createAsyncThunk(
  'predictions/updatePredictionItem',
  async (params: { 
    predictionId: number; 
    loadId: number; 
    anomalousRings: string 
  }, { rejectWithValue }) => {
    try {
      const { predictionId, loadId, anomalousRings } = params;
      const response = await api.api.predictionsItemsUpdate(predictionId, loadId, { anomalous_rings: anomalousRings })
      return { 
        ...response.data, 
        loadId,
        predictionId
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка обновления элемента')
    }
  }
)

export const removeFromPrediction = createAsyncThunk(
  'predictions/removeFromPrediction',
  async (params: { predictionId: number; loadId: number }, { rejectWithValue }) => {
    try {
      const { predictionId, loadId } = params;
      await api.api.predictionsItemsDelete(predictionId, loadId)
      return { predictionId, loadId }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка удаления элемента')
    }
  }
)

export const submitPrediction = createAsyncThunk(
  'predictions/submitPrediction',
  async (predictionId: number, { rejectWithValue }) => {
    try {
      const response = await api.api.predictionsFormUpdate(predictionId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка формирования заявки')
    }
  }
)

// ОБНОВЛЕНИЕ ОСНОВНЫХ ДАННЫХ ЗАЯВКИ
export const updatePrediction = createAsyncThunk(
  'predictions/updatePrediction',
  async (params: { predictionId: number; data: UpdatePredictionRequest }, { rejectWithValue }) => {
    try {
      const { predictionId, data } = params;
      const response = await api.api.predictionsUpdate(predictionId, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка обновления заявки')
    }
  }
)

export const deletePrediction = createAsyncThunk(
  'predictions/deletePrediction',
  async (predictionId: number, { rejectWithValue }) => {
    try {
      await api.api.predictionsDelete(predictionId)
      return predictionId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка удаления заявки')
    }
  }
)

// Действия для модератора
export const completePrediction = createAsyncThunk(
  'predictions/completePrediction',
  async (params: { predictionId: number; action: string }, { rejectWithValue }) => {
    try {
      const { predictionId, action } = params;
      const response = await api.api.predictionsCompleteUpdate(predictionId, { action })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка завершения заявки')
    }
  }
)

const predictionSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentPrediction: (state) => {
      state.currentPrediction = null
    },
    setPredictionLocalData: (state, action: { payload: { 
      predictionId: number; 
      description?: string; 
      totalRings?: string;
      anomalousRings?: Record<number, string>;
    } }) => {
      const { predictionId, description, totalRings, anomalousRings } = action.payload;
      
      // Инициализируем данные для конкретной заявки если их нет
      if (!state.localPredictionData[predictionId]) {
        state.localPredictionData[predictionId] = {
          description: '',
          totalRings: '',
          anomalousRings: {}
        };
      }
      
      // Обновляем только переданные поля
      if (description !== undefined) {
        state.localPredictionData[predictionId].description = description;
      }
      if (totalRings !== undefined) {
        state.localPredictionData[predictionId].totalRings = totalRings;
      }
      if (anomalousRings !== undefined) {
        // ИСПРАВЛЕНО: Используем type assertion для обхода проблемы типов
        state.localPredictionData[predictionId].anomalousRings = anomalousRings as Record<number, string>;
      }
    },
    clearPredictionLocalData: (state, action: { payload: number }) => {
      const predictionId = action.payload;
      if (state.localPredictionData[predictionId]) {
        delete state.localPredictionData[predictionId];
      }
    },
    removeAnomalousRings: (state, action: { payload: { predictionId: number; loadId: number } }) => {
      const { predictionId, loadId } = action.payload;
      if (state.localPredictionData[predictionId]) {
        const updatedRings = { ...state.localPredictionData[predictionId].anomalousRings };
        delete updatedRings[loadId];
        state.localPredictionData[predictionId].anomalousRings = updatedRings;
      }
    },
    updateCalculatedConsumption: (state, action: { payload: { 
      predictionId: number; 
      loadId: number; 
      calculatedConsumption: number;
      finalConsumption?: number;
    } }) => {
      const { loadId, calculatedConsumption, finalConsumption } = action.payload;
      
      if (state.currentPrediction && state.currentPrediction.predictionItems) {
        const itemIndex = state.currentPrediction.predictionItems.findIndex(
          item => item.load_id === loadId
        );
        if (itemIndex !== -1) {
          state.currentPrediction.predictionItems[itemIndex].calculated_consumption = calculatedConsumption;
        }
      }
      
      if (finalConsumption !== undefined && state.currentPrediction && state.currentPrediction.prediction) {
        state.currentPrediction.prediction.final_consumption = finalConsumption;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPredictions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserPredictions.fulfilled, (state, action) => {
        state.isLoading = false
        state.predictions = action.payload
        state.error = null
      })
      .addCase(fetchUserPredictions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchModeratorPredictions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchModeratorPredictions.fulfilled, (state, action) => {
        state.isLoading = false
        state.predictions = action.payload
        state.error = null
      })
      .addCase(fetchModeratorPredictions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchPredictionById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPredictionById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPrediction = action.payload
        state.error = null
        
        const prediction = action.payload.prediction;
        if (prediction && prediction.id) {
          if (!state.localPredictionData[prediction.id]) {
            state.localPredictionData[prediction.id] = {
              description: prediction.description || '',
              totalRings: prediction.total_rings?.toString() || '',
              anomalousRings: {}
            };
          }
        }
      })
      .addCase(fetchPredictionById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(addToPrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(removeFromPrediction.fulfilled, (state, action) => {
        const { predictionId, loadId } = action.payload
        if (state.currentPrediction && state.currentPrediction.prediction?.id === predictionId) {
          state.currentPrediction.predictionItems = state.currentPrediction.predictionItems?.filter(
            item => item.load_id !== loadId
          ) || []
        }
        if (state.localPredictionData[predictionId]) {
          const updatedRings = { ...state.localPredictionData[predictionId].anomalousRings };
          delete updatedRings[loadId];
          state.localPredictionData[predictionId].anomalousRings = updatedRings;
        }
        state.error = null
      })
      .addCase(removeFromPrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(submitPrediction.fulfilled, (state, action) => {
        if (state.currentPrediction && state.currentPrediction.prediction) {
          state.currentPrediction.prediction = action.payload
        }
        const updatedPrediction = state.predictions.find(prediction => prediction.id === action.payload.id)
        if (updatedPrediction) {
          updatedPrediction.status = action.payload.status
        }
        if (state.localPredictionData[action.payload.id!]) {
          delete state.localPredictionData[action.payload.id!];
        }
        state.error = null
      })
      .addCase(submitPrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updatePrediction.fulfilled, (state, action) => {
        if (state.currentPrediction && state.currentPrediction.prediction) {
          state.currentPrediction.prediction = { ...state.currentPrediction.prediction, ...action.payload };
        }
        const predictionIndex = state.predictions.findIndex(prediction => prediction.id === action.payload.id);
        if (predictionIndex !== -1) {
          state.predictions[predictionIndex] = { ...state.predictions[predictionIndex], ...action.payload };
        }
        state.error = null
      })
      .addCase(updatePrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updatePredictionItem.fulfilled, (state, action) => {
        const { loadId, anomalous_rings, calculated_consumption, predictionId } = action.payload;
        
        if (state.currentPrediction && state.currentPrediction.predictionItems) {
          const itemIndex = state.currentPrediction.predictionItems.findIndex(
            item => item.load_id === loadId
          );
          if (itemIndex !== -1) {
            state.currentPrediction.predictionItems[itemIndex] = {
              ...state.currentPrediction.predictionItems[itemIndex],
              anomalous_rings: anomalous_rings,
              calculated_consumption: calculated_consumption || state.currentPrediction.predictionItems[itemIndex].calculated_consumption
            };
          }
        }
        
        if (state.localPredictionData[predictionId]) {
          // ИСПРАВЛЕНО: Используем type assertion
          state.localPredictionData[predictionId].anomalousRings = {
            ...state.localPredictionData[predictionId].anomalousRings,
            [loadId]: anomalous_rings
          } as Record<number, string>;
        }
        
        state.error = null
      })
      .addCase(updatePredictionItem.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(deletePrediction.fulfilled, (state, action) => {
        state.predictions = state.predictions.filter(prediction => prediction.id !== action.payload)
        state.currentPrediction = null
        if (state.localPredictionData[action.payload]) {
          delete state.localPredictionData[action.payload];
        }
        state.error = null
      })
      .addCase(deletePrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(completePrediction.fulfilled, (state, action) => {
        const updatedPrediction = state.predictions.find(prediction => prediction.id === action.payload.id)
        if (updatedPrediction) {
          updatedPrediction.status = action.payload.status
        }
        if (state.localPredictionData[action.payload.id!]) {
          delete state.localPredictionData[action.payload.id!];
        }
        state.error = null
      })
      .addCase(completePrediction.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { 
  clearError, 
  clearCurrentPrediction,
  setPredictionLocalData,
  clearPredictionLocalData,
  removeAnomalousRings,
  updateCalculatedConsumption
} = predictionSlice.actions

export default predictionSlice.reducer