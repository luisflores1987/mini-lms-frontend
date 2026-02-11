import { useEffect, useState } from "react";
import { getMyCourses } from "../services/enrollmentService";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses()
      .then((courses) => setCount(courses.length))
      .catch(() => setCount(0));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!token) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mini LMS
        </Typography>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button
            color="inherit"
            component={Link}
            to="/courses"
            sx={{ textDecoration: "none" }}
          >
            Cursos
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/my-courses"
            sx={{ textDecoration: "none" }}
          >
            <Badge badgeContent={count} color="error">
              <Typography>Mis cursos</Typography>
            </Badge>
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
