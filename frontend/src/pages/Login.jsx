import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(email, password);

      login(res.user, res.token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>

            <Typography
              variant="h4"
              align="center"
              gutterBottom
            >
              Insurance Management Platform
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
              mb={3}
            >
              Login to Continue
            </Typography>

            <form onSubmit={handleLogin}>

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt:3 }}
              >
                {loading ? (
                  <CircularProgress size={25} color="inherit"/>
                ) : (
                  "Login"
                )}
              </Button>

            </form>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}