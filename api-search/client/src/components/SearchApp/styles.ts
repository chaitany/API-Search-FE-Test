import styled, { css } from 'styled-components';

// Define the transient prop type
interface LayoutProps {
  $isCentered: boolean;
}

export const Container = styled.div<LayoutProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem 2rem;
  min-height: 100vh;
  
  ${(props) =>
    props.$isCentered &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`;

export const Header = styled.header<LayoutProps>`
  width: 100%;
  z-index: 10;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 20px auto;
  padding: 35px 30px;
  border-radius: 10px;

  ${(props) =>
    props.$isCentered
      ? css`
          /* Initial Landing State: Transparent, no borders, centered content */
          display: flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
          padding: 0;
          margin-bottom: 0;
          border-bottom: none;
        `
      : css`
          /* Active Search State: Sticky frosted glass at the top */
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 35px 25px;
          margin-bottom: 2rem;
        `}
`;

export const SearchForm = styled.form<LayoutProps>`
  display: flex;
  width: 100%;
  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: ${(props) => (props.$isCentered ? '600px' : '75%')};
  margin: 0 auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #666;
  width: 100%;
`;