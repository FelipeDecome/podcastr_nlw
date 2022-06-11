import styled from 'styled-components';

export const Container = styled.div`
  --top-padding: 0.5rem;
  padding: var(--top-padding) var(--side-padding) var(--top-padding) 2rem;
  height: var(--minified-player-height);

  display: flex;
  align-items: center;
  gap: 2rem;

  background: var(--primary);

  .emptyPlayer,
  > div:first-child {
    height: calc(var(--minified-player-height) - 1rem);
    width: calc(var(--minified-player-height) - 1rem);
    min-width: calc(var(--minified-player-height) - 1rem);
  }

  > div:first-child:not(.emptyPlayer) {
    display: flex;

    border: 2px solid var(--primary-light);
    border-radius: 1.5rem;
    overflow: hidden;
  }

  .emptyPlayer {
    display: flex;

    &::after {
      content: '';
      width: 100%;
      height: 100%;

      background: var(--primary-gradient);
      border: 1px dashed var(--primary-lighter);
      border-radius: 1.5rem;
    }
  }

  .playerContent {
    min-width: 0; /* Fix flex breaking on white-space: nowrap; */

    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    strong {
      font-family: Lexend, sans-serif;
      font-weight: 600;
      color: var(--text-in-colors);

      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    > div:not(:first-child) {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      .controls div {
        margin-top: 0;
      }

      .progress {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;

        &.empty {
          opacity: 0.5;
        }

        span {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--text-in-colors);
        }

        .slider {
          flex: 1;

          .emptySlider {
            height: 4px;
            border-radius: 2px;
            background: var(--primary-lighter);
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    --top-padding: 0;

    .emptyPlayer,
    > div:first-child {
      /* Esconde a imagem */
      display: none !important;
    }

    .playerContent {
      width: 100%;
    }
  }
`;
