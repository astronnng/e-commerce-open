import { describe, expect, it, jest } from '@jest/globals';
import { createMocks } from 'node-mocks-http';

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

import { getSession } from 'next-auth/react';
import handler from '../../pages/api/keys/paypal';

describe('GET /api/keys/paypal', () => {
  it('returns 401 when the user is not authenticated', async () => {
    (getSession as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getData()).toBe('signin required');
  });

  it('returns the configured paypal client id for authenticated users', async () => {
    (getSession as jest.Mock).mockResolvedValue({ user: { name: 'Admin' } });
    process.env.PAYPAL_CLIENT_ID = 'paypal-client-id-test';

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('paypal-client-id-test');
  });
});
