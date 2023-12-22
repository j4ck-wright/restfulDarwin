import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { server } from '../..';

afterEach(() => {
  server.close();
});

describe('/health test suite', () => {
  it('/health returns correctly', async () => {
    const response = request(server).get('/health');
    expect((await response).statusCode).toEqual(200);
    expect((await response).body).toEqual({ status: 'OK' });
  });
});
