import styled from 'styled-components';

export const Container = styled.header`
    background: var(--items-background);
    height: var(--header-height);

    display: flex;
    align-items: center;

    padding: 0 4rem;

    border-bottom: 1px solid var(--items-complement);

    a {
        font-size: 0;
    }

    p {
        margin-left: 2rem;
        padding: 0.25rem 0 0.25rem 2rem;
        border-left: 1px solid var(--items-complement);
    }

    span {
        margin-left: auto;
        margin-right: 1.5rem;
        text-transform: capitalize;
    }

    @media (max-width: 767px) {
        padding: 0 2rem;

        a svg {
            height: 3rem;
        }

        p {
            display: none;
        }
    }

    @media (max-width: 560px) {
        padding: 0 1rem;

        a svg {
            height: 2.5rem;
        }
    }
`;
