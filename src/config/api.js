const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  console.error("❌ VITE_API_BASE is undefined");
}

export default API_BASE;
