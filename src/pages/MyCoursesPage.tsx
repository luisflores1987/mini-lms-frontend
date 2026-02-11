import { useEffect, useState } from "react";
import { getMyCourses } from "../services/enrollmentService";
import type { Course } from "../types/course";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getMyCourses()
      .then(setCourses)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Mis cursos</h2>

      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> - {course.instructor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
