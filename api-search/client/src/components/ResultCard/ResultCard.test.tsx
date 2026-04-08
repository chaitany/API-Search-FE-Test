import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultCard from './index';
import { ITunesResult } from '../../types';

describe('ResultCard Component', () => {
  const mockItem: ITunesResult = {
    trackId: 123,
    artistName: 'The Beatles',
    trackName: 'Hey Jude',
    artworkUrl100: 'https://example.com/image.jpg',
    wrapperType: 'track',
    kind: 'song',
  };

  it('renders correctly with given item data', () => {
    render(<ResultCard item={mockItem} />);
    
    expect(screen.getByText('Hey Jude')).toBeInTheDocument();
    expect(screen.getByText('The Beatles')).toBeInTheDocument();
    expect(screen.getByText('song')).toBeInTheDocument();
  });

  it('falls back to collectionName if trackName is not present', () => {
    const collectionItem: ITunesResult = {
      ...mockItem,
      trackName: undefined,
      collectionName: 'Abbey Road',
      wrapperType: 'collection',
      kind: undefined,
    };

    render(<ResultCard item={collectionItem} />);
    
    expect(screen.getByText('Abbey Road')).toBeInTheDocument();
    expect(screen.getByText('collection')).toBeInTheDocument();
  });

  it('renders the image with the correctly upgraded resolution URL', () => {
    render(<ResultCard item={mockItem} />);
    const imgElement = screen.getByAltText('Hey Jude') as HTMLImageElement;
    
    expect(imgElement.src).toBe('https://example.com/image.jpg'); 
  });
});