// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Lock, Person, ArrowBack, Login as LoginIcon } from "@mui/icons-material";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      alert("Login Successful");
      router.push("/home");
    } else {
      alert("Login failed");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              color: "#3b82f6",
              mb: 3,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "#64748b", mb: 4 }}
          >
            Sign in to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#6366f1" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  background: "#f3f4f6",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#06b6d4" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  background: "#f3f4f6",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                  boxShadow: 2,
                  mt: 1,
                  mb: 1,
                  letterSpacing: 1,
                  "&:hover": {
                    background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{
                  fontWeight: 600,
                  borderRadius: 3,
                  borderColor: "#94a3b8",
                  color: "#64748b",
                  background: "#f8fafc",
                  "&:hover": {
                    background: "#e0e7ef",
                    borderColor: "#64748b",
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
