import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const fetchInteractions = createAsyncThunk(
  'interactions/fetchAll',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/interactions/`);
    return response.data;
  }
);

export const createInteraction = createAsyncThunk(
  'interactions/create',
  async (interactionData) => {
    const response = await axios.post(`${API_BASE_URL}/interactions/`, interactionData);
    return response.data;
  }
);

export const updateInteraction = createAsyncThunk(
  'interactions/update',
  async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/interactions/${id}`, data);
    return response.data;
  }
);

export const deleteInteraction = createAsyncThunk(
  'interactions/delete',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/interactions/${id}`);
    return id;
  }
);

const interactionSlice = createSlice({
  name: 'interactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentInteraction: null,
  },
  reducers: {
    setCurrentInteraction: (state, action) => {
      state.currentInteraction = action.payload;
    },
    clearCurrentInteraction: (state) => {
      state.currentInteraction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setCurrentInteraction, clearCurrentInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;