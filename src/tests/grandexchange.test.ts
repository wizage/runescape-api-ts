import {describe, expect, it} from '@jest/globals';
import { getItem as getItemRS3, getItemGraph as getItemGraphRS3} from '../runescape/grandexchange';
import { getItem as getItemOSRS, getItemGraph as getItemGraphOSRS} from '../osrs/grandexchange';
//12183 - Spirit Shard id number should always be 24
describe('Grandexchange testing for RS3', () => {
  it('Get price of spirit shards', async () => {
    const response = await getItemRS3(12183);
    expect(response.name.toLowerCase()).toBe('spirit shards');
    expect(response.trends.current.price).toBe(24)
  });
  it('Get price of spirit shards', async () => {
    const response = await getItemGraphRS3(12183);
    const firstKey = Object.keys(response.average)[0];
    expect(response.average[firstKey]).toBe(24);
  });
});


//314 - feather id number should always be between 1-10
describe('Grandexchange testing for OSRS', () => {
  it('Get price of feather', async () => {
    const response = await getItemOSRS(314);
    expect(response.name.toLowerCase()).toBe('feather');
    expect(response.trends.current.price).toBeGreaterThanOrEqual(1);
    expect(response.trends.current.price).toBeLessThanOrEqual(10);
  });
  it('Get pricegraph of feather', async () => {
    const response = await getItemGraphOSRS(314);
    const firstKey = Object.keys(response.average)[0];
    expect(response.average[firstKey]).toBeGreaterThanOrEqual(1);
    expect(response.average[firstKey]).toBeLessThanOrEqual(10);
  });
});