import styled from 'styled-components';

export const Container = styled.aside`
  padding: 2.25rem 4rem 3rem;
    width: 26.5rem;
    height: 100vh;

    background: var(--primary);
    color: var(--text-in-colors);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    strong {
        font-family: Lexend, sans-serif;
        font-weight: 600;
    }

    footer {
        align-self: stretch;

        &.empty .progress {
            opacity: 0.5;
        }
    }
}

.currentEpisode {
    text-align: center;

    > div {
        border: 2px solid var(--primary-light);
        border-radius: 1.5rem;
    }

    strong {
        display: block;
        margin-top: 2rem;
        font: 600 1.25rem Lexend, sans-serif;
        line-height: 1.75rem;
    }
}

.emptyPlayer {
    padding: 4rem;
    width: 100%;
    height: 21.6rem;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    border: 1.5px dashed var(--primary-lighter);
    border-radius: 1.5rem;
    background: var(--primary-gradient);
}

.progress {
    font-size: 0.875rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    span {
        display: inline-block;
        text-align: center;
    }

    .slider {
        flex: 1;

        .emptySlider {
           width: 100%; 
           height: 4px;
           background: var(--primary-lighter);
           border-radius: 2px;
        }
    }
`;
