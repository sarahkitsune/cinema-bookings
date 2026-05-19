/**
 * Handle login by sending a POST request to the backend API
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<Object>} - The response from the backend API
 */

const API_URL = import.meta.env.VITE_APP_URL || "http://localhost:8000/";

export async function loginRequest(email: string, password: string): Promise<{ message: string; token?: string; error?: string }> {
  const res = await fetch(`${API_URL}api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "An error occurred while logging in");
  }

  return data;
}