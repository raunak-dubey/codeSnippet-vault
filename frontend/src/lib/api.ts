import logger from '@/lib/logger';

type ApiErrorShape = {
  message?: string;
  [key: string]: unknown;
};

export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(input, init);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const data: unknown = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const error = data as ApiErrorShape | null;

      logger.error('API Error', {
        status: res.status,
        error,
      });

      throw new Error(error?.message ?? 'Something went wrong');
    }

    return data as T; // 👈 controlled unsafe cast
  } catch (err) {
    logger.error('Network Error', { err });
    throw err;
  }
}
