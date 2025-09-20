
import { useState, useCallback } from 'react';

type GeminiApiCall<T, P extends any[]> = (...args: P) => Promise<T | null>;

interface UseGeminiReturn<T, P extends any[]> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  execute: (...args: P) => Promise<void>;
}

export const useGemini = <T, P extends any[]>(
  apiCall: GeminiApiCall<T, P>
): UseGeminiReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...args: P) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(...args);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall]);

  return { data, isLoading, error, execute };
};
