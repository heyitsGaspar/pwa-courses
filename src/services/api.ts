// src/services/api.ts

import axios from 'axios';

const API_URL = 'https://pwa-api-production-f5fc.up.railway.app/api/courses';

// Función para obtener los cursos
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Axios maneja automáticamente la respuesta en formato JSON
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};
