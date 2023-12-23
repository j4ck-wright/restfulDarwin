import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { server } from '../../server';

describe('/arrivals test suite', () => {
  it('/arrivals with no token', async () => {
    const response = request(server).get('/arrivals');
    expect((await response).statusCode).toEqual(401);
  });

  it('/arrivals happy path', () => {});
});
