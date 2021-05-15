import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --minified-player-height: 8.5rem;
    --header-height: 6.5rem;
    --footer-height: 4.5rem;
    --side-padding: 4rem;

    --text-heading: #494D4B;
    --text-default: #808080;
    --text-complement: #AFB2B1;
    --text-in-colors: #FFFFFF;

    --items-background: #FFFFFF;
    --items-complement: #E6E8EB;
    
    --background: #F5F6FA;

    --primary-gradient: linear-gradient(143.8deg, rgba(143, 39, 140, 0.8) 0%, rgba(143, 39, 140, 0) 100%);
    --primary-lighter: #822B80;
    --primary-light: #8F278C; 
    --primary: #6B0B69;
    --primary-dark: #490047;
    --secondary: #03D8E5;

    }

@media (max-width: 991px) {
    html {
        font-size: 87.5%;
    }
}

@media (max-width: 767px) {
    :root {
        --side-padding: 2rem;
    }

    html {
        font-size: 75%;
    }
}

@media (max-width: 559px) {
    :root {
        --footer-height: 6.5rem;
        --side-padding: 1.5rem;
    }
}

body {
    background: var(--background);
}

body, html {
    max-width: 100vw;
    max-height: 100vh;
    overflow-x: hidden;
}


body, input, textarea, button {
    font: 500 1rem Inter, sans-serif;
    color: var(--text-default);
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    font-family: Lexend, sans-serif;
    color: var(--text-heading);
}

h1 {
    font-size:  2rem;
}

h2 {
    font-size:  1.5rem;
}

button {
    cursor: pointer;
}`;
