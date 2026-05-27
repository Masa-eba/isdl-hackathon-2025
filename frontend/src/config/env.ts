// env.ts - 環境変数の型安全な読み出し

type Env = {
  apiBaseUrl: string;
};

export function getEnv(): Env {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  return { apiBaseUrl };
}

