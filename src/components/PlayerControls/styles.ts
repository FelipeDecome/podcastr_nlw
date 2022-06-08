import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;

  button {
    background: transparent;
    border: 0;
    font-size: 0;

    transition: opacity 0.2s, filter 0.2s, background 0.2s;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.2;
    }

    &:hover:not(:disabled):not(.active) {
      opacity: 0.6;
    }

    &.active {
      &:hover {
        filter: brightness(1.2);
      }

      svg path {
        stroke: var(--secondary);
      }
    }

    &.playButton:not(.minified button.playButton) {
      width: 4rem;
      height: 4rem;

      border-radius: 1rem;
      background: var(--primary-light);

      &.playing {
        background: var(--primary-dark);
      }
    }
  }

  @media (max-width: 767px) {
    &.minified {
      gap: 1rem;

      button {
        svg {
          width: 1.75rem;
          height: 1.75rem;
        }

        &.playButton svg {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
    }
  }
`;
