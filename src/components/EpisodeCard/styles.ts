import styled from 'styled-components';

import { Heading16, Paragraph } from '../../styles/components/Text';

export const Container = styled.li`
    flex: 1;
    padding: 1.5rem 2rem;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: 1.5rem;

    transition: transform 0.2s;

    hr {
        border: 0;
        border-top: 1px solid var(--gray-100);
        margin-bottom: 1rem;
    }

    &:hover {
        transform: scale(1.04);
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-width: 0;

    .podcast-image {
        font-size: 0;

        div {
            width: 4rem;
            height: 4rem;
            border-radius: 1rem;
        }
    }

    div.podcast-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;

        ${Heading16} + ${Paragraph} {
            margin-top: 0.5rem;
        }
    }

    button {
        width: 2.5rem;
        height: 2.5rem;

        background: var(--white);
        border: 1px solid var(--gray-100);
        border-radius: 0.675rem;
        font-size: 0;

        transition: filter 0.2s;

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }

        &:hover {
            filter: brightness(0.95);
        }
    }
`;

export const Content = styled.div`
    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    a {
        color: var(--gray-800);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    ${Paragraph} {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        max-height: 6rem;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        @media (max-width: 991px) {
            max-height: 4.5rem;
            -webkit-line-clamp: 3;
        }

        @media (max-width: 559px) {
            max-height: 3rem;
            -webkit-line-clamp: 2;
        }
    }
`;

export const Footer = styled.footer`
    padding: 0 2rem;
    width: 100%;

    display: flex;
    justify-content: flex-end;

    span {
        font-size: 0.875rem;
        font-weight: 400;
        display: inline-block;
        margin-top: 0.5rem;

        &:last-child {
            position: relative;
            margin-left: 0.5rem;
            padding-left: 0.5rem;

            &::after {
                content: '';
                width: 4px;
                height: 4px;
                border-radius: 2px;
                background: #ddd;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
`;
