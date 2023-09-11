import {describe, expect, it} from '@jest/globals';
import { getTotalUsers as getUserCountRS3, getAvatar as getAvaRS3} from '../runescape/miscellaneous';

// Pattern to check if it is a url
const pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

describe('Testing misc endpoints', () => {
  it('Check if people still play this game', async () => {
    const response = await getUserCountRS3();
    expect(response.accounts).toBeGreaterThan(0);
  });

  it('Check if we get back a valid url', async () => {
    //Checking if valid url is returned
    const response = await getAvaRS3('samweasley');
    expect(response).toBe('https://secure.runescape.com/m=avatar-rs/avatar.png?id=26306317');
    expect(response).toMatch(pattern);
  });

  it('Check if we get back a default url', async () => {
    //Checking if valid url is returned
    const response = await getAvaRS3('samweasley1');
    expect(response).toBe('https://secure.runescape.com/m=avatar-rs/default_chat.png?');
    expect(response).toMatch(pattern);
  });
});
