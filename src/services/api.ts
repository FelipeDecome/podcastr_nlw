import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL || 'https://listen-api-test.listennotes.com/api/v2',
    headers: {
        'X-ListenAPI-Key': process.env.API_KEY
    }
});

export { api };
