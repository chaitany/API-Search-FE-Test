import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const Loader: React.FC = () => (
  <LoaderWrapper data-testid="loader">
    <CircularProgress />
  </LoaderWrapper>
);

export default Loader;