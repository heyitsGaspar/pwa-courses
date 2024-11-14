// src/components/CoursesList.tsx

import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/api.ts';
import CourseCard from '../components/CourseCard.tsx';

interface Course {
  id: string;
  nombre: string;
  precio: string;
  categoria: 'Tecnología' | 'Inglés' | 'Matemáticas';
  autor: string;
}

const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cursos Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
