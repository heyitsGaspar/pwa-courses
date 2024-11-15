// src/components/CourseCard.tsx

import React from 'react';

interface Course {
  id: string;
  nombre: string;
  precio: string;
  categoria: 'Tecnología' | 'Inglés' | 'Matemáticas';
  autor: string;
}

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;  // Función para manejar la edición
  onDelete: (courseId: string) => void;  // Función para manejar la eliminación
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold">{course.nombre}</h3>
      <p className="text-sm text-gray-500">Autor: {course.autor}</p>
      <p className="text-sm text-gray-500">Categoría: {course.categoria}</p>
      <p className="text-lg font-bold mt-2">${course.precio}</p>

      {/* Botones para editar y eliminar */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(course)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(course.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
