javascriptconst API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function callBackend(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  const data = await res.json();
  console.log("Backend lenthu vantha data da:", data);
  return data;
}