"use client";

import * as React from "react";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StarIcon from "@mui/icons-material/Star";
import SecurityIcon from "@mui/icons-material/Security";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RocketIcon from "@mui/icons-material/Rocket";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter(); // Initialize the router

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };
  const handleRegisterClick = () => {
    router.push('/register'); // Navigate to the login page
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RocketIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#fff" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontWeight: 900,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: 2,
                fontSize: "2rem",
              }}
            >
              Data Management App
            </Typography>
            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {["Home", "Features", "Pricing", "Contact"].map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Logo (Mobile) */}
            <RocketIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#fff" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="./"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontWeight: 900,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: 2,
                fontSize: "1.5rem",
              }}
            >
              MyApp
            </Typography>
            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}>
              {["Home", "Features", "Pricing", "Contact"].map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#fff",
                    display: "block",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    mx: 1,
                    letterSpacing: 1,
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0.01, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleLoginClick}
                sx={{
                  my: 2,
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 3,
                  mx: 1,
                  background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                  boxShadow: 2,
                  transition: "background 0.2s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleRegisterClick}
                sx={{
                  my: 2,
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 3,
                  mx: 1,
                  background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
                  boxShadow: 2,
                  transition: "background 0.2s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #0e7490 0%, #4338ca 100%)",
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 10, md: 18 },
          textAlign: "center",
          background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            gutterBottom
            fontWeight={900}
            color="primary"
            sx={{
              letterSpacing: 2,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              textShadow: "0 4px 24px rgba(99,102,241,0.08)",
            }}
          >
            Welcome to Our Platform
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 4, fontWeight: 500, fontSize: { xs: "1.1rem", md: "1.3rem" } }}
          >
            Powerful. Secure. Easy. Everything you need in one place.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              boxShadow: 3,
              letterSpacing: 1,
              transition: "background 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
              },
            }}
            onClick={handleRegisterClick}
          >
            Get Started
          </Button>
        </Container>
        {/* Glassmorphism effect */}
        <Box
          sx={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            background: "rgba(99,102,241,0.15)",
            borderRadius: "50%",
            filter: "blur(60px)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            background: "rgba(6,182,212,0.15)",
            borderRadius: "50%",
            filter: "blur(60px)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }} id={"features"}>
        <Typography
          variant="h4"
          fontWeight={800}
          color="primary"
          textAlign="center"
          sx={{ mb: 6, letterSpacing: 1 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <RocketLaunchIcon fontSize="large" color="primary" />,
              title: "Login",
              description: "Secure and fast login functionality for users.",
            },
            {
              icon: <SecurityIcon fontSize="large" color="primary" />,
              title: "Register",
              description: "Easily register new users with secure validation.",
            },
            {
              icon: <StarIcon fontSize="large" color="primary" />,
              title: "Home",
              description: "A central hub to access all features and tools.",
            },
            {
              icon: <RocketLaunchIcon fontSize="large" color="primary" />,
              title: "User Table",
              description: "View and manage user data in a structured table.",
            },
            {
              icon: <SecurityIcon fontSize="large" color="primary" />,
              title: "CRUD Operations",
              description: "Create, Read, Update, and Delete user data seamlessly.",
            },
            {
              icon: <StarIcon fontSize="large" color="primary" />,
              title: "Search",
              description: "Quickly find users or data with advanced search.",
            },
            {
              icon: <RocketLaunchIcon fontSize="large" color="primary" />,
              title: "Sort",
              description: "Sort data by various fields for better organization.",
            },
            {
              icon: <SecurityIcon fontSize="large" color="primary" />,
              title: "Pagination",
              description: "Navigate through large datasets with ease.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: "0 4px 24px 0 rgba(99,102,241,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)",
                  },
                }}
              >
                {feature.icon}
                <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ py: 10, textAlign: "center", background: "linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)" }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight={800} color="primary" sx={{ letterSpacing: 1 }}>
            Pricing Plans
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Choose a plan that fits your needs.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={4} sx={{
                p: 4,
                borderRadius: 5,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 24px 0 rgba(99,102,241,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                  boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)",
                },
              }}>
                <Typography variant="h6" fontWeight={700}>
                  Basic
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={800}>
                  $10<span style={{ fontSize: "1.2rem", fontWeight: 400 }}>/month</span>
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Ideal for individuals starting out.
                </Typography>
                <Button variant="contained" color="primary" sx={{
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                  boxShadow: 2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
                  },
                }}>
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={6} sx={{
                p: 4,
                borderRadius: 5,
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                color: "#fff",
                boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)",
                transform: "scale(1.05)",
                zIndex: 2,
              }}>
                <Typography variant="h6" fontWeight={700}>
                  Pro
                </Typography>
                <Typography variant="h4" fontWeight={800}>
                  $30<span style={{ fontSize: "1.2rem", fontWeight: 400 }}>/month</span>
                </Typography>
                <Typography variant="body1" color="rgba(255,255,255,0.85)" paragraph>
                  Perfect for small teams and businesses.
                </Typography>
                <Button variant="contained" color="secondary" sx={{
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  background: "#fff",
                  color: "#6366f1",
                  boxShadow: 2,
                  "&:hover": {
                    background: "#e0e7ff",
                    color: "#4338ca",
                  },
                }}>
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={4} sx={{
                p: 4,
                borderRadius: 5,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 24px 0 rgba(99,102,241,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                  boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18)",
                },
              }}>
                <Typography variant="h6" fontWeight={700}>
                  Enterprise
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={800}>
                  Contact Us
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Custom solutions for large organizations.
                </Typography>
                <Button variant="contained" color="primary" sx={{
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
                  boxShadow: 2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #0e7490 0%, #4338ca 100%)",
                  },
                }}>
                  Contact Us
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{
        py: 10,
        textAlign: "center",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
      }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom fontWeight={800} color="primary" sx={{ letterSpacing: 1 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Have questions? We're here to help.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              boxShadow: 3,
              letterSpacing: 1,
              transition: "background 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
              },
            }}
            onClick={() => window.location.href = "mailto:support@yourcompany.com"}
          >
            Email Us
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
          color: "#fff",
          textAlign: "center",
          letterSpacing: 1,
          fontWeight: 500,
          fontSize: "1.1rem",
        }}
      >
        <Typography variant="body1">
          &copy; 2025 Your Company. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
