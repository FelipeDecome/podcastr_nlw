import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 2rem;
  margin: 0 auto;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: scroll;

  display: flex;
  justify-content: center;

  > div {
    max-width: 45rem;

    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 0;

    > p {
      padding-bottom: 6rem;
    }
  }

  @media (max-width: 1439px) {
    height: calc(
      100vh - 6.5rem - var(--minified-player-height) - var(--footer-height)
    );
  }

  .thumbnailContainer {
    max-width: 100%;
    width: 45rem;
    height: 10rem;

    position: relative;

    > div {
      width: 100%;
      height: 100%;
    }

    img {
      border-radius: 1rem;
    }

    button {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      border: 0;
      position: absolute;
      z-index: 5;
      font-size: 0;

      transition: filter 0.2s;

      svg {
        width: 2rem;
        height: 2rem;
      }

      &:first-child {
        left: 0;
        top: 50%;
        background: var(--primary);
        transform: translate(-50%, -50%);
      }

      &:last-child {
        right: 0;
        top: 50%;
        background: var(--secondary);
        transform: translate(50%, -50%);
      }

      &:hover {
        filter: brightness(1.2);
      }
    }
  }

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--items-complement);

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;
        position: relative;

        &::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: var(--items-complement);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .description {
    margin-top: 2rem;
    text-align: justify;
  }
`;
