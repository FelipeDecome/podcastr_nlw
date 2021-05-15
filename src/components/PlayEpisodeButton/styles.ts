import styled from 'styled-components';

interface IContainerProps {
    small?: boolean;
}

export const Container = styled.button<IContainerProps>`
    width: ${(props) => (props.small ? '2rem' : '2.5rem')};
    height: ${(props) => (props.small ? '2rem' : '2.5rem')};

    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: ${(props) => (props.small ? '0.5rem' : '0.625rem')};
    font-size: 0;

    transition: filter 0.2s;

    svg {
        width: ${(props) => (props.small ? '1.25rem' : '1.5rem')};
        height: ${(props) => (props.small ? '1.25rem' : '1.5rem')};

        path {
            fill: var(--green-500);
        }
    }

    &:hover {
        filter: brightness(0.94);
    }
`;
