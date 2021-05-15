import styled from 'styled-components';

export const Wrapper = styled.div`
    min-width: 375px;
    max-width: 100vw;

    main {
        flex: 1;
    }

    @media (min-width: 1440px) {
        display: flex;
    }
`;
