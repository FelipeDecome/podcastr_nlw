import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 var(--side-padding);

  height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  section {
    margin-top: 3rem;
    width: 100%;
    max-width: 63.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }
  }

  .latestEpisodes {
    ul {
      display: flex;
      justify-content: center;
      /* grid-template-columns: repeat(2, 1fr); */

      gap: 1.5rem;

      list-style: none;
    }
  }

  .allEpisodes {
    padding-bottom: 2rem;
  }

  @media (max-width: 767px) {
    align-items: center;

    section {
      max-width: 40rem;
    }

    .latestEpisodes {
      ul {
        flex-direction: column;
      }
    }
  }

  @media (min-width: 768px) {
    align-items: center;
  }

  @media (max-width: 1439px) {
    height: calc(
      100vh - 6.5rem - var(--minified-player-height) - var(--footer-height)
    );
  }
`;
