// src/pages/Home.tsx

import React from 'react';
import CoursesList from '../components/CoursesList.tsx';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenidos a PWA Courses</h1>
      <CoursesList />
    </div>
  );
};

export default Home;
