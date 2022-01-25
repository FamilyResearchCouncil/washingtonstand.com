import styled from 'styled-components';

export const StyledStaffLink = styled.a`
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 1.6rem;
  transition: all .2s ease;
  grid-gap: 2rem;
  justify-items: center;
  
  img {
    max-width: 120px;
    border-radius: 50%;
    transition: all .2s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;