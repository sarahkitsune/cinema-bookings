type JwtPayload = {
  userId?: number;
  role?: string;
  exp?: number;
};

const TOKEN_KEY = "token";

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as JwtPayload;
    return payload;
  } catch {
    return null;
  }
}

export function saveAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload?.userId || !payload.role) return null;

  if (payload.exp && Date.now() >= payload.exp * 1000) {
    clearAuthToken();
    return null;
  }

  return {
    id: payload.userId,
    role: payload.role,
  };
}
