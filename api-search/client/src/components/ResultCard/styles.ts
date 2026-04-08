import styled from 'styled-components';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px; 
  background-color: #ffffff;
  color: #333333;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

export const MediaWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-color: #f5f5f5;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentWrapper = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MetaTag = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #666666;
  letter-spacing: 0.5px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;