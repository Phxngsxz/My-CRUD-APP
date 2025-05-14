import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

function AppbarWithSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleHome = () => {
    router.push("/home");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Appbar */}
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              background: "rgba(255,255,255,0.08)",
              "&:hover": { background: "rgba(255,255,255,0.18)" },
            }}
            disabled
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 900,
              letterSpacing: 2,
              color: "#fff",
              textShadow: "0 2px 8px rgba(99,102,241,0.12)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Data Management App
          </Typography>
          <Tooltip title="Logout">
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                px: 2,
                background: "rgba(255,255,255,0.08)",
                transition: "background 0.2s",
                "&:hover": {
                  background: "rgba(255,255,255,0.18)",
                },
              }}
            >
              Logout
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
            borderRight: "none",
            boxShadow: "4px 0 24px 0 rgba(99,102,241,0.08)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ px: 2, py: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#6366f1",
              fontWeight: 700,
              letterSpacing: 1,
              mb: 2,
              textTransform: "uppercase",
              fontSize: "0.95rem",
            }}
          >
            Navigation
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItem
              button
              onClick={handleHome}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#6366f1" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: 1,
                  onClick: handleHome,
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default AppbarWithSidebar;