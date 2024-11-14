// src/components/CourseCard.tsx

import React from 'react';

interface Course {
  id: string;
  nombre: string;
  precio: string;
  categoria: 'Tecnología' | 'Inglés' | 'Matemáticas';
  autor: string;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold">{course.nombre}</h3>
      <p className="text-sm text-gray-500">Autor: {course.autor}</p>
      <p className="text-sm text-gray-500">Categoría: {course.categoria}</p>
      <p className="text-lg font-bold mt-2">${course.precio}</p>
    </div>
  );
};

export default CourseCard;
