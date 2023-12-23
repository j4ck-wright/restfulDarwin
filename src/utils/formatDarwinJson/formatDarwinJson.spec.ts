import { describe, expect, it } from 'vitest';
import { formatDarwinJSON } from './formatDarwinJson';
import response from '../../fixtures/response.json';

import { readFile } from 'fs';

describe('formatDarwinJson test suite', () => {
  it('returns correctly for GetArrivalBoardResponse', () => {
    readFile('src/fixtures/darwinResponse.xml', 'utf-8', function (err, data) {
      expect(err).toBeNull();

      const output = formatDarwinJSON(data, 'GetArrivalBoardResponse');
      expect(output).toEqual(JSON.stringify(response, null, 4));
    });
  });
});
