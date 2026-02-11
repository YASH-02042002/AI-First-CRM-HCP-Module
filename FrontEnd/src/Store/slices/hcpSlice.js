import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchHCPs = createAsyncThunk(
  'hcp/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/hcp`);
    return response.data.hcps;
  }
);

export const searchHCPs = createAsyncThunk(
  'hcp/search',
  async (query) => {
    const response = await axios.post(`${API_URL}/tools/search-hcp`, { query });
    return response.data.results;
  }
);

export const createHCP = createAsyncThunk(
  'hcp/create',
  async (hcpData) => {
    const response = await axios.post(`${API_URL}/hcp`, hcpData);
    return response.data.hcp;
  }
);

const hcpSlice = createSlice({
  name: 'hcp',
  initialState: {
    items: [],
    searchResults: [],
    loading: false,
    error: null,
    selectedHCP: null,
  },
  reducers: {
    setSelectedHCP: (state, action) => {
      state.selectedHCP = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHCPs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHCPs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHCPs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchHCPs.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(createHCP.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { setSelectedHCP, clearSearchResults } = hcpSlice.actions;
export default hcpSlice.reducer;