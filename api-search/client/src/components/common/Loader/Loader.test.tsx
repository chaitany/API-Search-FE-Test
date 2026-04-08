import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './index';

describe('Loader Component', () => {
  it('renders without crashing and displays the loader element', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});