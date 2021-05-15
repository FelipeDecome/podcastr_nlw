import styled from 'styled-components';

const families = {
    lexend: 'Lexend, sans-serif',
    inter: 'Inter, sans-serif'
};

export const Heading24 = styled.h1`
    font-family: ${families.lexend};
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--text-heading);
`;

export const Heading16 = styled.h2`
    font-family: ${families.lexend};
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-heading);
`;

export const Paragraph = styled.p`
    font-family: ${families.inter};
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.675rem;
    letter-spacing: 0.05em;
    color: var(--text-default);
`;
