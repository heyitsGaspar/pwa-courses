import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../services/api.ts'; // Asegúrate de que la ruta sea correcta
import AddCourseModal from '../components/AddCourseModal.tsx';
import EditCourseModal from '../components/EditCourseModal.tsx';
import CourseCard from '../components/CourseCard.tsx'; // Importamos el componente CourseCard

// Define el tipo de un curso
type Course = {
  id: string;
  nombre: string;
  precio: string;
  categoria: "Tecnología" | "Inglés" | "Matemáticas"; // Restringir a estos valores específicos
  autor: string;
};

const CourseList: React.FC = () => {
  // Define un valor predeterminado para el curso en edición
  const defaultCourse: Course = {
    id: '',
    nombre: '',
    precio: '',
    categoria: "Tecnología", // Valor predeterminado
    autor: ''
  };

  // Tipar el estado courses como un array de objetos tipo Course
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course>(defaultCourse); // Inicializa con defaultCourse

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);

  const handleEditModalOpen = (course: Course) => {
    setCourseToEdit(course); // Establece el curso a editar
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => setIsEditModalOpen(false);

  const handleCourseAdded = () => {
    getCourses().then((data) => setCourses(data));
  };

  const handleCourseEdited = () => {
    getCourses().then((data) => setCourses(data));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Cursos</h1>
      <button onClick={handleAddModalOpen} className="bg-blue-500 text-white py-2 px-4 rounded">
        Agregar Curso
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={handleEditModalOpen}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal para agregar curso */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onCourseAdded={handleCourseAdded}
      />

      {/* Modal para editar curso */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        course={courseToEdit}
        onClose={handleEditModalClose}
        onCourseEdited={handleCourseEdited}
      />
    </div>
  );
};

export default CourseList;
