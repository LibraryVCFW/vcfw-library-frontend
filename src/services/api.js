const API_BASE = "https://vcfw-library-backend.onrender.com/api"; // 🔥 Updated to deployed backend URL

/* ===================== NOTICES ===================== */
export async function getNotices() {
  const res = await fetch(`${API_BASE}/notices`);
  if (!res.ok) throw new Error("Failed to fetch notices");
  return res.json();
}

export async function addNotice(data) {
  const res = await fetch(`${API_BASE}/notices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add notice");
  return res.json();
}

export async function updateNotice(id, data) {
  const res = await fetch(`${API_BASE}/notices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update notice");
  return res.json();
}

export async function deleteNotice(id) {
  const res = await fetch(`${API_BASE}/notices/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete notice");
  return res.json();
}

/* ===================== RESOURCES (NEW ARRIVALS) ===================== */
// 🔥 Backend-aligned, DeepSeek-free

export async function getResources() {
  const res = await fetch(`${API_BASE}/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addResource(resource) {
  const payload = {
    title: resource.title,
    author: resource.author,
    publisher: resource.publisher,
    year: resource.year,
    type: resource.type || "Book",
  };

  const res = await fetch(`${API_BASE}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error("Failed to add resource: " + err);
  }

  return res.json();
}

export async function deleteResource(id) {
  const res = await fetch(`${API_BASE}/resources/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete resource");
  return res.json();
}

/* ===================== REQUISITIONS ===================== */
export async function submitRequisition(data) {
  const res = await fetch(`${API_BASE}/requisitions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit requisition");
  return res.json();
}

export async function getRequisitions() {
  const res = await fetch(`${API_BASE}/requisitions`);
  if (!res.ok) throw new Error("Failed to fetch requisitions");
  return res.json();
}

export async function updateRequisitionStatus(id, status) {
  const res = await fetch(`${API_BASE}/requisitions/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update requisition status");
  return res.json();
}

/* ===================== GRIEVANCES ===================== */
export async function getGrievances() {
  const res = await fetch(`${API_BASE}/grievances`);
  if (!res.ok) throw new Error("Failed to fetch grievances");
  return res.json();
}

export async function submitGrievance(data) {
  const res = await fetch(`${API_BASE}/grievances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit grievance");
  return res.json();
}

export async function trackGrievance(trackingId) {
  const res = await fetch(`${API_BASE}/grievances/track/${trackingId}`);
  if (!res.ok) throw new Error("Failed to track grievance");
  return res.json();
}

export async function resolveGrievance(id, reply) {
  const res = await fetch(`${API_BASE}/grievances/${id}/resolve`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reply }),
  });
  if (!res.ok) throw new Error("Failed to resolve grievance");
  return res.json();
}

/* ===================== ADMIN ===================== */
export async function adminLogin(data) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Admin login failed");
  return res.json();
}
