import styled, { css } from 'styled-components';

export const Container = styled.footer`
    padding: 0 4rem;
    height: var(--footer-height);

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--items-background);
    border-top: 1px solid var(--items-complement);

    a {
        text-decoration: none;
    }

    a:first-child {
        display: flex;
        align-items: center;

        font-family: Lexend, sans-serif;
        font-weight: 600;
        color: var(--text-heading);

        &:hover {
            ${(props) =>
                props.theme.title === 'light'
                    ? css`
                          span {
                              color: var(--primary-dark);
                          }

                          svg path {
                              fill: var(--primary-dark);
                          }
                      `
                    : css`
                          span {
                              color: var(--secondary);
                          }

                          svg path {
                              fill: var(--secondary);
                          }
                      `};
        }

        span {
            transition: color 0.2s;
        }

        svg {
            margin-right: 0.75rem;

            path {
                transition: fill 0.2s;
            }
        }
    }

    .listenNotesCredit img {
        height: 1.25rem;
        object-fit: cover;
    }

    @media (max-width: 559px) {
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
    }

    @media (max-width: 767px) {
        padding: 0 1.5rem;
    }

    @media (max-width: 992px) {
        padding: 0 2rem;
    }
`;
