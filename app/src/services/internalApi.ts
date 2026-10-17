import axios from 'axios';

const authenticationToken = localStorage.getItem('token');

export default axios.create({
    baseURL: import.meta.env.VITE_INTERNAL_API_URL ?? 'http://localhost:4000/api',
    headers: {
        'Authorization': `Bearer ${authenticationToken}`,
    }
});