import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SearchApp from './index';

import rootReducer from '../../store/rootReducer';
import type { RootState } from '../../store/store';
import { ITunesResult } from '../../types';

const setupTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('SearchApp Component', () => {
  it('renders the search input field and search button', () => {
    const store = setupTestStore({
      search: { 
        allResults: [],
        displayedResults: [],
        displayCount: 0,
        loading: false, 
        isInitialEmpty: true, 
        query: '', 
        hasMore: false, 
        error: null 
      }
    });

    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays empty state when search yields no results', () => {
    const store = setupTestStore({
      search: { 
        allResults: [],
        displayedResults: [],
        displayCount: 0,
        loading: false, 
        isInitialEmpty: false, 
        query: 'random', 
        hasMore: false, 
        error: null 
      }
    });

    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );

    expect(screen.getByTestId('empty-state')).toHaveTextContent('No results found for "random"');
  });

  it('renders a list of ResultCards when data is present', () => {
    const mockResults: ITunesResult[] = [
      { trackId: 1, artistName: 'Artist 1', trackName: 'Song 1', wrapperType: 'track', artworkUrl100: '', kind: 'song' },
      { trackId: 0, collectionId: 2, artistName: 'Artist 2', collectionName: 'Album 1', wrapperType: 'collection', artworkUrl100: '' }
    ];

    const store = setupTestStore({
      search: { 
        allResults: mockResults,
        displayedResults: mockResults,
        displayCount: 10,
        loading: false, 
        isInitialEmpty: false, 
        query: 'Artist', 
        hasMore: true, 
        error: null 
      }
    });

    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );

    expect(screen.getAllByTestId('result-card')).toHaveLength(2);
    expect(screen.getByText('Song 1')).toBeInTheDocument();
  });
});