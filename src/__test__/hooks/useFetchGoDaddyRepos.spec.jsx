import { renderHook, act, waitFor } from '@testing-library/react';
import useFetchGoDaddyRepos from '../../hooks/useFetchGoDaddyRepos';

// Mock `fetch` globally
global.fetch = jest.fn();

describe('useFetchGoDaddyRepos Hook', () => {
  const mockUrl = 'https://api.github.com/orgs/godaddy/repos';
  const mockResponse = { name: 'sample-repo', language: 'JavaScript' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with loading state as true and empty data', () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({}),
    });
    const { result } = renderHook(() => useFetchGoDaddyRepos(mockUrl));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual({});
  });

  test('should fetch and set data correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useFetchGoDaddyRepos(mockUrl));

    // Fast-forward the timer to trigger the fetch
    act(() => {
      jest.runAllTimers();
    });

    // Wait for the fetch call and state updates
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(mockUrl);
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  test('should handle fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('API fetch failed'));
    const { result } = renderHook(() => useFetchGoDaddyRepos(mockUrl));
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
    expect(result.current.data).toEqual({});
  });
});
