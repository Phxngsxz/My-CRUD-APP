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
import { Add, Edit, Delete } from "@mui/icons-material";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | undefined>(undefined); // ไม่ fix
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name" | "age">("id");
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");

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

  const router = useRouter();

  const fetchUsers = async (pageNum = page) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        ...(search && { search }),
        sortBy,
        order,
      });
      const res = await fetch(
        `http://localhost:3333/users?${params.toString()}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.items || data.data || []);
      setTotal(data.total || 0);
      setLimit(data.limit); // รับ limit จาก backend
      setLastPage(data.last_page || 1); // รับ last_page จาก backend
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, page, search, sortBy, order]);

  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setOpen(false);
        setNewUser({ name: "", username: "", password: "", age: 0, address: "" });
        // รีเฟรชข้อมูลหน้าแรก (หรือจะใช้ page เดิมก็ได้)
        setPage(1);
        fetchUsers(1);
      } else {
        const errMsg = await res.text();
        alert("Failed to create user: " + errMsg);
        console.error("Failed to create user:", errMsg);
      }
    } catch (err) {
      alert("Error creating user: " + err);
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
          <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
            <TextField
              label="Search"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              size="small"
              sx={{ width: 220 }}
            />
            <TextField
              select
              label="Sort By"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as "id" | "name" | "age")}
              size="small"
              sx={{ width: 120 }}
              SelectProps={{ native: true }}
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
            </TextField>
            <TextField
              select
              label="Order"
              value={order}
              onChange={e => setOrder(e.target.value as "ASC" | "DESC")}
              size="small"
              sx={{ width: 120 }}
              SelectProps={{ native: true }}
            >
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </TextField>
            <Box sx={{ flex: 1 }} /> {/* ดัน Add User ไปขวาสุด */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              sx={{
                height: 40,
                minWidth: 120,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
                color: "#fff",
                boxShadow: 2,
                }}
            >
              + ADD USER
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f1f5f9" }}>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Age</b></TableCell>
                  <TableCell><b>Address</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
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
          </TableContainer>

          {/* Pagination Controls */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              sx={{ mr: 2 }}
            >
              Prev
            </Button>
            <Typography>
              Page {page} of {lastPage}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= lastPage}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          </Box>
        </Container>

        {/* Add Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#3b82f6" }}>
            Add New User
          </DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <TextField fullWidth margin="dense" label="Name" value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Username" value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Password" type="password" value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Age" type="number" value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) || 0 })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Address" value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions sx={{ pb: 2, pr: 3 }}>
            <Button onClick={() => setOpen(false)} color="secondary" variant="outlined">Cancel</Button>
            <Button onClick={handleCreate} color="primary" variant="contained">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#6366f1" }}>Edit User</DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <TextField fullWidth margin="dense" label="Name" value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Username" value={editUser.username}
              onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Password" type="password" value={editUser.password}
              onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Age" type="number" value={editUser.age}
              onChange={(e) => setEditUser({ ...editUser, age: parseInt(e.target.value) || 0 })} sx={{ mb: 2 }} />
            <TextField fullWidth margin="dense" label="Address" value={editUser.address}
              onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions sx={{ pb: 2, pr: 3 }}>
            <Button onClick={() => setEditOpen(false)} color="secondary" variant="outlined">Cancel</Button>
            <Button onClick={handleEdit} color="primary" variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Home;
