import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { 
  setSearchTerm, 
  setSearchConsumption, 
  setFilters, 
  clearFilters, 
  addRecentSearch,
  clearSearch
} from '../slices/searchSlice'

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.search)

  const updateSearchTerm = useCallback((term: string) => {
    dispatch(setSearchTerm(term))
  }, [dispatch])

  const updateSearchConsumption = useCallback((consumption: string) => {
    dispatch(setSearchConsumption(consumption))
  }, [dispatch])

  const updateFilters = useCallback((filters: any) => {
    dispatch(setFilters(filters))
  }, [dispatch])

  const resetFilters = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  const saveSearchToHistory = useCallback((query: string) => {
    if (query.trim()) {
      dispatch(addRecentSearch(query.trim()))
    }
  }, [dispatch])

  const resetSearch = useCallback(() => {
    dispatch(clearSearch())
  }, [dispatch])

  return {
    searchTerm: search.searchTerm,
    searchConsumption: search.searchConsumption,
    filters: search.filters,
    recentSearches: search.recentSearches,
    updateSearchTerm,
    updateSearchConsumption,
    updateFilters,
    resetFilters,
    saveSearchToHistory,
    resetSearch
  }
}