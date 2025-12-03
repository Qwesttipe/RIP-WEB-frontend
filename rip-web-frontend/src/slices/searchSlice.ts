import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  searchTerm: string
  searchConsumption: string
  filters: {
    consumptionFrom?: string
    consumptionTo?: string
    type?: string
  }
  recentSearches: string[]
}

const initialState: SearchState = {
  searchTerm: '',
  searchConsumption: '',
  filters: {},
  recentSearches: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setSearchConsumption: (state, action: PayloadAction<string>) => {
      state.searchConsumption = action.payload
    },
    setFilters: (state, action: PayloadAction<SearchState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
      state.searchTerm = ''
      state.searchConsumption = ''
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = [
        action.payload,
        ...state.recentSearches.filter(search => search !== action.payload)
      ].slice(0, 10)
    },
    clearSearch: (state) => {
      state.searchTerm = ''
      state.searchConsumption = ''
    }
  },
})

export const { 
  setSearchTerm, 
  setSearchConsumption, 
  setFilters, 
  clearFilters, 
  addRecentSearch,
  clearSearch
} = searchSlice.actions

export default searchSlice.reducer