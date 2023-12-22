import axios from 'axios';

const apiAlunos = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default apiAlunos;

