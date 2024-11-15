import React, { useState } from 'react';
import { addCourse } from '../services/api.ts'; // Asegúrate de que la ruta sea correcta.ts

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseAdded: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onCourseAdded }) => {
  const [course, setCourse] = useState({
    nombre: '',
    precio: '',
    categoria: 'Tecnología', // Valor predeterminado
    autor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCourse(course);
      onCourseAdded(); // Notificar que el curso fue agregado
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Agregar Curso</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={course.nombre}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Precio:</label>
            <input
              type="text"
              name="precio"
              value={course.precio}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Categoría:</label>
            <select
              name="categoria"
              value={course.categoria}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Inglés">Inglés</option>
              <option value="Matemáticas">Matemáticas</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Autor:</label>
            <input
              type="text"
              name="autor"
              value={course.autor}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            >
              Agregar Curso
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
