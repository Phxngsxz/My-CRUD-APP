
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Appbar from '@/components/Appbar';

export default async function Home() {
  const res = await fetch("http://localhost:3333/users", { cache: "no-store" }); // Use `no-store` for dynamic data
  const users = await res.json();

  return (
    <>  
      <Container maxWidth="lg">
      <ul>
        {users.map((user: { id: number; name: string; coverimage: string }) => (
          <li key={user.id}>
            {user.id} {user.name} {user.age} {user.address}
          </li>
        ))}
      </ul>
      </Container>
    </>
  );
}
