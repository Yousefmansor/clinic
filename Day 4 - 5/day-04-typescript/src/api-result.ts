// api-result.ts

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function success<T>(data: T): ApiResult<T> {
  return { ok: true, data };
}

export function failure(error: string): ApiResult<never> {
  return { ok: false, error };
}
