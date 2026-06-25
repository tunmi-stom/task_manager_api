let BASE_URL = localStorage.getItem('tm_base_url') || '';

export function getBaseUrl() {
  return BASE_URL;
}

export function setBaseUrl(url) {
  BASE_URL = url.replace(/\/$/, '');
  localStorage.setItem('tm_base_url', BASE_URL);
}

async function request(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== null) opts.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + path, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.detail;
    if (Array.isArray(detail)) {
      throw new Error(detail.map(d => d.msg).join(', '));
    }
    throw new Error(detail || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return data.detail;
}

export const tasksApi = {
  list: () => request('/api/v1/tasks/'),
  get: (id) => request(`/api/v1/tasks/${id}`),
  create: (data) => request('/api/v1/tasks/create-task', 'POST', data),
  update: (id, data) => request(`/api/v1/tasks/update-task/${id}`, 'PUT', data),
  delete: (id) => request(`/api/v1/tasks/delete-task/${id}`, 'DELETE'),
};
