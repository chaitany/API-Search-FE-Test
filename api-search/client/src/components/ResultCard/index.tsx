import React from 'react';
import { Typography } from '@mui/material';
import { ITunesResult } from '../../types';
import { StyledCard, MediaWrapper, ContentWrapper, MetaTag } from './styles';

interface ResultCardProps {
  item: ITunesResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
  const imageUrl = item.artworkUrl100?.replace('100x100', '300x300') || 'https://via.placeholder.com/300?text=No+Image';
  const title = item.trackName || item.collectionName || 'Unknown Title';
  
  return (
    <StyledCard data-testid="result-card">
      <MediaWrapper>
        <img src={imageUrl} alt={title} loading="lazy" />
      </MediaWrapper>
      <ContentWrapper>
        <MetaTag>{item.wrapperType === 'track' ? item.kind : item.wrapperType}</MetaTag>
        <Typography variant="subtitle1" component="h2" noWrap title={title}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap title={item.artistName}>
          {item.artistName}
        </Typography>
      </ContentWrapper>
    </StyledCard>
  );
};

export default ResultCard;