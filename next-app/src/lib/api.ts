export async function fetchItems(page = 1, limit = 10) {
  const res = await fetch(`http://localhost:3333/users?page=${page}&limit=${limit}`, {
    next: { revalidate: 0 }  // ปิด cache สำหรับ SSR
  });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}