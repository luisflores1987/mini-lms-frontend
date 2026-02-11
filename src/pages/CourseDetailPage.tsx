import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import {
  getTasksWithStatus,
  completeTask,
  uncompleteTask,
} from "../services/taskService";
import type { Course } from "../types/course";
import type { UserTask } from "../types/task";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  LinearProgress,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourseDetails = useCallback(async () => {
    setLoading(true);
    try {
      const courseData = await getCourseById(Number(id));
      const tasksData = await getTasksWithStatus(Number(id));
      setCourse(courseData);
      setTasks(tasksData);
      setError(null);
    } catch {
      setError("Error cargando los detalles del curso");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadCourseDetails();
    }
  }, [id, loadCourseDetails]);

  const toggleTask = async (task: UserTask) => {
    if (!id) return;

    try {
      if (task.completed) {
        await uncompleteTask(task.taskId);
      } else {
        await completeTask(task.taskId);
      }

      const updated = await getTasksWithStatus(Number(id));
      setTasks(updated);
    } catch {
      setError("Error al actualizar la tarea");
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Volver atrás
        </Button>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="warning">Curso no encontrado</Alert>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Volver atrás
        </Button>
      </Container>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const progressPercentage = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* Header */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Volver
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {course.description}
          </Typography>
          <Typography variant="body2">
            <strong>Instructor:</strong> {course.instructor}
          </Typography>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Progreso: {completedCount} / {total} tareas
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ height: 8, borderRadius: 1, mb: 1 }}
          />
          <Typography variant="caption" color="textSecondary">
            {Math.round(progressPercentage)}% completado
          </Typography>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tareas del curso
          </Typography>

          {tasks.length === 0 ? (
            <Alert severity="info">No hay tareas disponibles</Alert>
          ) : (
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task.taskId}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton
                    onClick={() => toggleTask(task)}
                    disabled={false}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={task.description}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CourseDetailPage;
