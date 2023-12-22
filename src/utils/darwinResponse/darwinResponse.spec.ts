import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchDarwinResponse } from './darwinResponse';
import axios, { AxiosError } from 'axios';

vi.mock('axios');

afterEach(() => {
  vi.resetAllMocks();
});

describe('fetchDarwinResponse test suite', () => {
  it('happy path returns correctly'),
    async () => {
      const mockReturn = `<?xml version="1.0" encoding="utf-8"?>`;

      const spy = vi
        .spyOn(axios, 'post')
        .mockResolvedValue({ data: mockReturn, status: 200 });

      const response = await fetchDarwinResponse('xml body');

      expect(spy).toHaveBeenCalledOnce();
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(mockReturn);
    };
  it('Darwin does not return 200 OK', async () => {
    const spy = vi
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: undefined, status: 401 });

    const response = await fetchDarwinResponse('xml body');

    expect(spy).toHaveBeenCalledOnce();
    expect(response.status).toEqual(401);
    expect(response.data).toBeUndefined();
  });

  it('Error handled correctly', async () => {
    const networkError = new AxiosError('Something went wrong');
    const spy = vi.spyOn(axios, 'post').mockRejectedValue(networkError);

    const response = await fetchDarwinResponse('xml body');

    expect(spy).toHaveBeenCalledOnce();
    expect(response.status).toEqual(500);
    expect(response.data).toBeUndefined();
  });
});
