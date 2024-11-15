import axios from 'axios';

const API_URL = 'https://pwa-api-production-f5fc.up.railway.app/api/courses';

// Función para obtener los cursos
export const getCourses = async () => {
  try {
    // Intenta obtener los cursos desde la API
    const response = await axios.get(API_URL);
    const courses = response.data;

    // Guardar los cursos en el caché después de obtenerlos de la API
    if ('caches' in window) {
      const cache = await caches.open('courses-cache-v2');
      const responseToCache = new Response(JSON.stringify(courses));
      cache.put(API_URL, responseToCache);
    }

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);

    // Intentar cargar desde el caché en caso de error (offline)
    if ('caches' in window) {
      const cache = await caches.open('courses-cache-v2');
      const cachedResponse = await cache.match(API_URL);
      if (cachedResponse) {
        const cachedCourses = await cachedResponse.json();
        return cachedCourses;
      }
    }

    throw new Error("No hay datos en caché y no se pudo acceder a la API.");
  }
};

// export const getCourses = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     return [];
//   }
// };

// Función para agregar un nuevo curso
export const addCourse = async (course: { nombre: string, precio: string, categoria: string, autor: string }) => {
  try {
    const response = await axios.post(API_URL, course);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

// Función para editar un curso
export const editCourse = async (id: string, updatedCourse: { nombre: string, precio: string, categoria: string, autor: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCourse);
    return response.data;
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
};

// Función para eliminar un curso
export const deleteCourse = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};
