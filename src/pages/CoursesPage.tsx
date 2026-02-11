import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import type { Course } from "../services/courseService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Box
} from "@mui/material";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
      setError(null);
    } catch {
      setError("Error cargando cursos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Cursos
      </Typography>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty */}
      {!loading && !error && courses.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No hay cursos disponibles
        </Alert>
      )}

      {/* Data */}
      {!loading && !error && courses.length > 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, mt: 2 }}>
          {courses.map((course) => (
            <Card key={course.id} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
              </CardContent>

              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Ver detalle
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default CoursesPage;
