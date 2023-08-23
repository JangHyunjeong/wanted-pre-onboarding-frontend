import axios from 'axios';
const token = JSON.parse(localStorage.getItem('access_token'));

export const instance = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop/todos/',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
