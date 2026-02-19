import { useState, useEffect } from 'react';

type FetchFn<T> = () => Promise<T>;

interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useSupabaseData<T>(fetchFn: FetchFn<T>, deps: any[] = []): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (!cancelled) {
          setData(result);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load data');
          console.error('Data fetch error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}
