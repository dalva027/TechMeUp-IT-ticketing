const API_BASE = "/api";

interface FetchOptions {
  method?: string;
  body?: any;
}

async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body } = options;
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || "Request failed");
  }

  if (response.status === 204) return null as any;
  return response.json();
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      fetcher<{ user: any; token: string }>("/auth/login", { method: "POST", body: data }),
    register: (data: { name: string; email: string; password: string; role?: string }) =>
      fetcher<{ user: any; token: string }>("/auth/register", { method: "POST", body: data }),
    getMe: () => fetcher<any>("/auth/me"),
  },

  tickets: {
    getAll: (params?: Record<string, string>) => {
      const query = new URLSearchParams(params).toString();
      return fetcher<{ tickets: any[]; total: number; page: number; totalPages: number }>(
        `/tickets${query ? `?${query}` : ""}`
      );
    },
    getById: (id: string) => fetcher<any>(`/tickets/${id}`),
    create: (data: { title: string; description: string; priority?: string; assigneeId?: string }) =>
      fetcher<any>("/tickets", { method: "POST", body: data }),
    update: (id: string, data: any) =>
      fetcher<any>(`/tickets/${id}`, { method: "PUT", body: data }),
    delete: (id: string) =>
      fetcher<void>(`/tickets/${id}`, { method: "DELETE" }),
  },

  comments: {
    getByTicket: (ticketId: string) =>
      fetcher<any[]>(`/comments/ticket/${ticketId}`),
    create: (data: { ticketId: string; content: string }) =>
      fetcher<any>("/comments", { method: "POST", body: data }),
  },
};
