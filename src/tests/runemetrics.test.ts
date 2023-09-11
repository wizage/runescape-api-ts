import {describe, expect, it} from '@jest/globals';
import { getMonthlyXp as getMonthlyXPRS3, getProfile as getProfileRS3, getQuests as getQuestsRS3} from '../runescape/runemetrics';
import {
  Skill,
} from "../lib/runescape"

describe('Testing runemetric', () => {
  it('Check if skill numbers work', async () => {
    const response = await getMonthlyXPRS3('samweasley', 0);
    expect(response.totalExperience).toBeGreaterThanOrEqual(0);
  });
  it('Check if skill names work', async () => {
    const response = await getMonthlyXPRS3('samweasley', new Skill('overall'));
    expect(response.totalExperience).toBeGreaterThanOrEqual(0);
  });

  it('Check if we get back a profile', async () => {
    const response = await getProfileRS3('samweasley');
    expect(response.activities.length).toBeGreaterThan(0);
  });

  it('Check if we get a quest back', async () => {
    const response = await getQuestsRS3('samweasley');
    expect(response[0].status).toBe('COMPLETED');
    expect(response[0].name).toBe('\'Phite Club');
  });
});
