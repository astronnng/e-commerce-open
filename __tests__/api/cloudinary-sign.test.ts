import { describe, expect, it, jest } from '@jest/globals';
import { createMocks } from 'node-mocks-http';

const apiSignRequest = jest.fn(() => 'signed-value');

jest.mock('cloudinary', () => ({
  v2: {
    utils: {
      api_sign_request: apiSignRequest,
    },
  },
}));

import handler from '../../pages/api/admin/cloudinary-sign';

describe('GET /api/admin/cloudinary-sign', () => {
  it('returns a generated signature and timestamp', () => {
    process.env.CLOUDINARY_SECRET = 'cloudinary-secret-test';

    const { req, res } = createMocks({
      method: 'GET',
    });

    handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(apiSignRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        timestamp: expect.any(Number),
      }),
      'cloudinary-secret-test'
    );

    expect(res._getJSONData()).toEqual({
      signature: 'signed-value',
      timestamp: expect.any(Number),
    });
  });
});
