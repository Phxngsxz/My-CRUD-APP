"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Appbar from "../../components/Appbar";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Toolbar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import { Add, Edit, Delete, Search as SearchIcon } from "@mui/icons-material";

const drawerWidth = 240;

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  age: number;
  address: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    password: "",
    age: 0,
    address: "",
  });

  const [editUser, setEditUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    password: "",
    age: 0,
    address: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof User>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3333/users", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const createdUser = await res.json();
        setUsers((prev) => [...prev, createdUser]);
        setNewUser({ name: "", username: "", password: "", age: 0, address: "" });
        setOpen(false);
      } else {
        console.error("Failed to create user");
      }
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3333/users/${editUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditOpen(false);
        setEditUser({ id: 0, name: "", username: "", password: "", age: 0, address: "" });
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3333/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: "asc" | "desc",
    orderBy: Key
  ): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = filteredUsers.slice().sort(getComparator(order, orderBy));
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Appbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, md: 3 },
          ml: { md: `${drawerWidth}px` },
          background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            mt: 1,
            mb: 1,
            background: "#fff",
            borderRadius: 4,
            boxShadow: 4,
            p: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: 1,
              mb: 3,
              textAlign: "center",
            }}
          >
            User List
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
              mb: 3,
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpen(true)}
              sx={{
                background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                fontWeight: 600,
                px: 3,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #4338ca 0%, #0e7490 100%)",
                },
              }}
            >
              Add User
            </Button>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              sx={{
                minWidth: { xs: "100%", sm: 300 },
                background: "#f3f4f6",
                borderRadius: 2,
                boxShadow: 1,
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
                ),
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              borderRadius: 3,
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f1f5f9" }}>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={() => handleRequestSort("id")}
                    >
                      <b>ID</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      <b>Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "age"}
                      direction={orderBy === "age" ? order : "asc"}
                      onClick={() => handleRequestSort("age")}
                    >
                      <b>Age</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "address"}
                      direction={orderBy === "address" ? order : "asc"}
                      onClick={() => handleRequestSort("address")}
                    >
                      <b>Address</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        transition: "background 0.2s",
                        "&:hover": { background: "#e0f2fe" },
                      }}
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="outlined"
                          size="small"
                          startIcon={<Edit />}
                          sx={{
                            mr: 1,
                            borderRadius: 2,
                            borderColor: "#6366f1",
                            color: "#6366f1",
                            "&:hover": {
                              background: "#6366f1",
                              color: "#fff",
                              borderColor: "#6366f1",
                            },
                          }}
                          onClick={() => {
                            setEditUser(user);
                            setEditOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          startIcon={<Delete />}
                          sx={{
                            borderRadius: 2,
                            borderColor: "#ef4444",
                            color: "#ef4444",
                            "&:hover": {
                              background: "#ef4444",
                              color: "#fff",
                              borderColor: "#ef4444",
                            },
                          }}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary" sx={{ py: 3 }}>
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                ".MuiTablePagination-toolbar": { background: "#f1f5f9" },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                  color: "#64748b",
                },
              }}
            />
          </TableContainer>
        </Container>

        {/* Add User Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#3b82f6" }}>
            Add New User
          </DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <TextField
              autoFocus fullWidth margin="dense" label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Password" type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Age" type="number"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) || 0 })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 2, pr: 3 }}>
            <Button onClick={() => setOpen(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleCreate} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#6366f1" }}>
            Edit User
          </DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <TextField
              autoFocus fullWidth margin="dense" label="Name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Username"
              value={editUser.username}
              onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Password" type="password"
              value={editUser.password}
              onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Age" type="number"
              value={editUser.age}
              onChange={(e) => setEditUser({ ...editUser, age: parseInt(e.target.value) || 0 })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth margin="dense" label="Address"
              value={editUser.address}
              onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 2, pr: 3 }}>
            <Button onClick={() => setEditOpen(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleEdit} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Home;
