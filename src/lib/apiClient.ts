/**
 * Centralised API client for the Flask backend.
 * Handles JWT token storage and authenticated requests.
 */

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";

/** Retrieve the stored JWT token. */
export const getToken = (): string | null => localStorage.getItem("auth_token");

/** Persist JWT token. */
export const setToken = (token: string): void => localStorage.setItem("auth_token", token);

/** Remove stored token (logout). */
export const clearToken = (): void => localStorage.removeItem("auth_token");

/** Parse a JWT payload without verifying signature (client-side only). */
export const parseToken = (token: string): Record<string, any> | null => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

/**
 * Generic fetch wrapper that attaches the JWT Authorization header
 * and handles JSON responses.
 */
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const resp = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const json = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return { data: null, error: json.error || `Request failed (${resp.status})` };
    }
    return { data: json as T, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || "Network error" };
  }
}
