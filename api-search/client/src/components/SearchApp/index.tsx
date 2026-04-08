import React, { useEffect, useState, FormEvent } from 'react';
import { TextField, Typography, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { fetchSearchResults, setQuery, loadMoreLocal } from '../../store/searchSlice';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ResultCard from '../ResultCard';
import Loader from '../common/Loader';

import { Container, Header, SearchForm, GridContainer, EmptyStateWrapper } from './styles';

const SearchApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayedResults, loading, hasMore, query, isInitialEmpty, error } = useAppSelector((state) => state.search);
  
  const [localSearch, setLocalSearch] = useState('');

  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null, 
    rootMargin: '0px',
    threshold: 0.1,
  });

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearch = localSearch.trim();
    
    if (trimmedSearch !== '') {
      dispatch(setQuery(trimmedSearch));
      dispatch(fetchSearchResults(trimmedSearch));
    } else {
      dispatch(setQuery(''));
    }
  };

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;

    if (isIntersecting && hasMore && displayedResults.length > 0) {
      debounceTimer = setTimeout(() => {
        dispatch(loadMoreLocal());
      }, 100);
    }

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [isIntersecting, hasMore, displayedResults.length, dispatch]);

  return (
    <Container $isCentered={isInitialEmpty}>
      <Header $isCentered={isInitialEmpty}>
        
        <Typography 
          variant={isInitialEmpty ? "h3" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: isInitialEmpty ? 700 : 400, transition: 'all 0.3s', fontSize: '28px', textAlign: 'center' }}
        >
          iTunes Search
        </Typography>
        
        <SearchForm onSubmit={handleSearchSubmit} $isCentered={isInitialEmpty}>
          <TextField
            fullWidth
            placeholder="Search Artists, Albums, or Songs" 
            variant="outlined"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            data-testid="search-input"
            sx={{
              '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                transition: 'background-color 5000s ease-in-out 0s',
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    disabled={loading}
                    startIcon={<SearchIcon />}
                    sx={{ 
                      padding: '12px 16px',
                      borderRadius: '50px', 
                      minWidth: '100px',     
                      lineHeight: 1,
                      fontSize: '12px',
                      fontWeight: 600,
                      '& .MuiButton-startIcon': { marginRight: '4px', marginLeft: 0 } 
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
              sx: {
                paddingRight: '6px', 
                borderRadius: '50px',
                background: '#ffffff',
              }
            }
            }}
          />
        </SearchForm>
      </Header>

      {error && (
        <Typography color="error" variant="body1" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!isInitialEmpty && displayedResults.length === 0 && !loading && !error && (
        <EmptyStateWrapper data-testid="empty-state">
          <Typography variant="h6">No results found for "{query}"</Typography>
        </EmptyStateWrapper>
      )}

      {!isInitialEmpty && (
        <GridContainer>
          {displayedResults.map((item, index) => {
            const uniqueKey = `${item.trackId || item.collectionId || item.artistId}-${index}`;
            return <ResultCard key={uniqueKey} item={item} />;
          })}
        </GridContainer>
      )}

      {loading && <Loader />}

      {displayedResults.length > 0 && hasMore && (
        <div ref={targetRef} style={{ height: '20px', width: '100%' }} />
      )}
      
    </Container>
  );
};

export default SearchApp;