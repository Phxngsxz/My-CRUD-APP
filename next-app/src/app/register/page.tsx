// app/register/page.tsx

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
import { Person, Lock, Home, ArrowBack, HowToReg, Numbers, LocationOn } from "@mui/icons-material";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ name, username, password, age, address }),
    });

    const data = await res.json();

    if (data.access_token) {
      alert("Register Successful");
      router.push("/login");
    } else if (data.statusCode === 409) {
      alert("Username already exists. Please try a different username.");
    } else {
      alert("Register Failed: " + (data.error || "Unknown error"));
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            mt: 2,
            my: 1,
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
              color: "#06b6d4",
              mb: 3,
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "#64748b", mb: 4 }}
          >
            Register to get started
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#06b6d4" }} />
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
              <TextField
                label="Age"
                type="number"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers sx={{ color: "#6366f1" }} />
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
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn sx={{ color: "#06b6d4" }} />
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
                startIcon={<HowToReg />}
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
                  boxShadow: 2,
                  mt: 1,
                  mb: 1,
                  letterSpacing: 1,
                  "&:hover": {
                    background: "linear-gradient(90deg, #0e7490 0%, #4338ca 100%)",
                  },
                }}
              >
                Register
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

export default Register;
