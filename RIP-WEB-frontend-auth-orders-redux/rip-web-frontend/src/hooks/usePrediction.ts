// usePrediction.ts (adapted to use predictions slice)
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  fetchUserPredictions,
  fetchModeratorPredictions,
  fetchPredictionById,
  addToPrediction,
  updatePredictionItem,
  removeFromPrediction,
  submitPrediction,
  updatePrediction,
  deletePrediction,
  completePrediction,
  clearError,
  clearCurrentPrediction
} from '../slices/predictionSlice';

export const usePredictions = () => {
  const dispatch = useAppDispatch();
  const predictionsState = useAppSelector(state => state.predictions);
  const { user } = useAppSelector(state => state.auth);

  const isModerator = user?.is_moderator;

  const loadUserPredictions = useCallback(async (filters?: { status?: string; date_from?: string; date_to?: string }) => {
    try {
      if (isModerator) {
        await dispatch(fetchModeratorPredictions(filters)).unwrap();
      } else {
        await dispatch(fetchUserPredictions(filters || {})).unwrap();
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch, isModerator]);

  const loadModeratorPredictions = useCallback(async (filters?: { status?: string; date_from?: string; date_to?: string }) => {
    try {
      await dispatch(fetchModeratorPredictions(filters)).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const loadPrediction = useCallback(async (predictionId: number) => {
    try {
      await dispatch(fetchPredictionById(predictionId)).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const addToPredictionItem = useCallback(async (anomalyId: number) => {
    try {
      await dispatch(addToPrediction(anomalyId)).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const updateItem = useCallback(async (predictionId: number, loadId: number, anomalousRings: string) => {
    try {
      await dispatch(updatePredictionItem({ predictionId, loadId, anomalousRings })).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const removeFromPredictionItem = useCallback(async (predictionId: number, loadId: number) => {
    try {
      await dispatch(removeFromPrediction({ predictionId, loadId })).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const submit = useCallback(async (predictionId: number) => {
    try {
      await dispatch(submitPrediction(predictionId)).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const update = useCallback(async (predictionId: number, data: any) => {
    try {
      await dispatch(updatePrediction({ predictionId, data })).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const remove = useCallback(async (predictionId: number) => {
    try {
      await dispatch(deletePrediction(predictionId)).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const completePredictionAction = useCallback(async (predictionId: number, action: string) => {
    try {
      await dispatch(completePrediction({ predictionId, action })).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetCurrentPrediction = useCallback(() => {
    dispatch(clearCurrentPrediction());
  }, [dispatch]);

  return {
    // State (kept name `predictions` for compatibility with components)
    predictions: predictionsState.predictions,
    currentPrediction: predictionsState.currentPrediction,
    isLoading: predictionsState.isLoading,
    error: predictionsState.error,
    isModerator,
    
    // Actions
    loadUserPredictions,
    loadModeratorPredictions,
    loadPrediction,
    addToPrediction: addToPredictionItem,
    updateItem,
    removeFromPrediction: removeFromPredictionItem,
    submit,
    update,
    remove,
    completePrediction: completePredictionAction,
    resetError,
    resetCurrentPrediction,
  };
};