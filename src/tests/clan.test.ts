import {describe, expect, it} from '@jest/globals';
import { getMembers as getMembersRS3} from '../runescape/clan';
//12183 - Spirit Shard id number should always be 24
describe('Testing clan api endpoint', () => {
  it('Check if I am still owner', async () => {
    const response = await getMembersRS3('The Enduring');
    expect(response[0].name).toBe('wizages');
    expect(response[0].rank).toBe('Owner')
  });
});