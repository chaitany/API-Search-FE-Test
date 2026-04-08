import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';
import axios from 'axios';
import { ITunesResponse, ClientSearchState } from '../types';

const initialState: ClientSearchState = {
  allResults: [],
  displayedResults: [],
  loading: false,
  error: null,
  query: '',
  displayCount: 0,
  hasMore: false,
  isInitialEmpty: true,
};

export const fetchSearchResults = createAsyncThunk<
  ITunesResponse,
  string,
  { rejectValue: string }
>(
  'search/fetchResults',
  async (term, { signal, rejectWithValue }) => {
    try {
      // Since there is no offset, we are getting all the results on the initial call.
      // The maximum limit is 200.
      const response = await axiosClient.get<ITunesResponse>(
        `/search?term=${encodeURIComponent(term)}&limit=200`,
        { signal }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isCancel(error)) return rejectWithValue('Cancelled');
      return rejectWithValue('Failed to fetch results.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.allResults = [];
      state.displayedResults = [];
      state.displayCount = 0;
      state.hasMore = false;
      state.isInitialEmpty = action.payload.trim() === '';
    },
    // NEW: Synchronous action to reveal the next 10 items locally
    loadMoreLocal: (state) => {
      const nextCount = state.displayCount + 10;
      state.displayedResults = state.allResults.slice(0, nextCount);
      state.displayCount = nextCount;
      state.hasMore = nextCount < state.allResults.length;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        // Filter only music from results
        state.allResults = action.payload.results.filter(item => item.kind === 'song');
        
        // Setup initial UI slice (first 10 items)
        state.displayCount = 10;
        state.displayedResults = action.payload.results.slice(0, 10);
        state.hasMore = action.payload.results.length > 10;
        state.isInitialEmpty = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        if (action.meta.aborted || action.payload === 'Cancelled') return;
        state.loading = false;
        state.error = action.payload || 'Failed to fetch results';
      });
  },
});

export const { setQuery, loadMoreLocal } = searchSlice.actions;
export default searchSlice.reducer;