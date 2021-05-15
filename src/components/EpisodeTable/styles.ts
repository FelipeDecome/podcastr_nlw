import styled from 'styled-components';

export const Container = styled.table`
    width: 100%;

    th,
    td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--gray-100);

        &:first-child {
            width: 4.5rem;
        }

        &:not(:nth-child(2)) {
            text-align: center;
            white-space: nowrap;
        }
    }

    th {
        color: var(--gray-200);
        text-transform: uppercase;
        font: 500 0.75rem Lexend, sans-serif;
        text-align: left;
    }

    td {
        font-size: 0.875rem;

        img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
        }

        a {
            color: var(--gray-800);
            font-family: Lexend, sans-serif;
            font-weight: 600;
            text-decoration: none;
            line-height: 1.4rem;
            font-size: 1rem;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media (max-width: 480px) {
        .hiddenOn_XS_SM {
            display: none;
        }
    }

    @media (max-width: 767px) {
        .hiddenOn_SM {
            display: none;
        }
    }

    @media (max-width: 992px) {
        .hiddenOn_SM_MD {
            display: none;
        }
    }
`;
