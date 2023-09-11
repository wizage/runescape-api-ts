import {describe, expect, it} from '@jest/globals';

import {getPlayer as getPlayerRS3, getPlayerRaw as getPlayerRawRS3} from '../runescape/hiscores';
import {getPlayer as getPlayerOSRS, getPlayerRaw as getPlayerRawOSRS} from '../osrs/hiscores';

import { Player as RS3Player} from '../lib/runescape';
import { Player as OSRSPlayer} from '../lib/osrs';
import { hiscores as RS3hiscores } from '../configs/runescape';
import { hiscores as OSRShiscores } from '../configs/oldschool';

export const badPlayerName = 'samweasley1';
export const playerName = 'samweasley';
export const OSRSName = 'b0aty';

describe('Hiscores RS3 Tests', () => {
  let player: RS3Player;
  let playerRaw: number[][];
  let hiscoreConfigRS3 = RS3hiscores;
  it('Get player hiscores', async () => {
    player = await getPlayerRS3(playerName);
  });
  it('Get raw player hiscores', async () => {
    playerRaw = await getPlayerRawRS3(playerName);
  });
  it('Checking if the JagexAPI didn\'t add any new skills/activies', async () => {
    const playerSkillsToTest = Object.keys(player.skills).length;
    const playerActivitesToTest = Object.keys(player.activities).length;
    // Test to make sure nothing new has been added to Jagex api for hiscores
    expect(playerSkillsToTest + playerActivitesToTest).toBe(playerRaw.length);
  });
  it.each(hiscoreConfigRS3.skills.map((value, index) => ({value, index})))
    ('Testing if $value is the same as the raw data', ({value, index}) => {
    expect(player.skills[value].experience).toBe(playerRaw[index][2])
  });
  it.each(hiscoreConfigRS3.activities.map((value, index) => ({value, index})))
    ('Testing if $value is the same as the raw data', ({value, index}) => {
    const playerSkillsToTest = Object.keys(player.skills).length;
    expect(player.activities[value].count).toBe(playerRaw[index+playerSkillsToTest][1])
  });
});

it('Getting player that doesn\'t exist', async () => {
  async function testPlayer(){
    const player = await getPlayerRS3(badPlayerName);
  }
  await expect(testPlayer()).rejects.toThrow('Player not found');
});

describe('Hiscores OSRS Tests', () => {
  let playerOSRS: OSRSPlayer;
  let playerRaw: number[][];
  let hiscoreConfigOSRS = OSRShiscores;
  it('Get player hiscores', async () => {
    playerOSRS = await getPlayerOSRS(OSRSName);
  });
  it('Get raw player hiscores', async () => {
    playerRaw = await getPlayerRawOSRS(OSRSName);
  });
  it('Checking if the JagexAPI didn\'t add any new skills/activies', async () => {
    const playerSkillsToTest = Object.keys(playerOSRS.skills).length;
    const playerActivitesToTest = Object.keys(playerOSRS.activities).length;
    const playerBossesToTest = Object.keys(playerOSRS.bosses).length;
    // Test to make sure nothing new has been added to Jagex api for hiscores
    expect(playerSkillsToTest + playerActivitesToTest+playerBossesToTest).toBe(playerRaw.length);
  });
  it.each(hiscoreConfigOSRS.skills.map((value, index) => ({value, index})))
    ('Testing if $value is the same as the raw data', ({value, index}) => {
    expect(playerOSRS.skills[value].experience).toBe(playerRaw[index][2])
  });
  it.each(hiscoreConfigOSRS.activities.map((value, index) => ({value, index})))
    ('Testing if $value is the same as the raw data', ({value, index}) => {
    const playerSkillsToTest = Object.keys(playerOSRS.skills).length;
    expect(playerOSRS.activities[value].count).toBe(playerRaw[index+playerSkillsToTest][1])
  });
  it.each(hiscoreConfigOSRS.bosses.map((value, index) => ({value, index})))
    ('Testing if $value is the same as the raw data', ({value, index}) => {
    const playerSkillsToTest = Object.keys(playerOSRS.skills).length+Object.keys(playerOSRS.activities).length;
    expect(playerOSRS.bosses[value].count).toBe(playerRaw[index+playerSkillsToTest][1])
  });
});

