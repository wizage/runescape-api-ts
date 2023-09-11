import { hiscores } from "../configs/runescape"
import * as osrs from "../configs/oldschool"
import { Jagex } from "../types"

/**
 * RuneScape 3
 */

const separateIntoLines = (jagexPlayer: string): string[] => {
  return jagexPlayer.split("\n")
}
const formatActivities = (activitiesArray: string[]) => {
  let activities = {} as Jagex.Hiscores.PlayerActivites;

  hiscores.activities.map((activityName, index) => {
    const [rank, count] = activitiesArray[index].split(",")
    activities[activityName] = { rank: parseInt(rank), count: parseInt(count) }
  })

  return activities
}
const formatSkills = (skillsArray: string[]) => {
  let skills = {} as Jagex.Hiscores.PlayerSkills;

  hiscores.skills.map((skillName, index) => {
    const [rank, level, experience] = skillsArray[index].split(",")
    skills[skillName] = {
      rank: parseInt(rank),
      level: parseInt(level),
      experience: parseInt(experience),
    }
  })

  return skills
}
export const formatRuneMetricsProfileSkills = (
  skillsArray: Jagex.RuneMetrics.ProfileSkills[]
) => {
  let skills = {} as Jagex.Hiscores.PlayerSkills;

  hiscores.skills.map((skillName, index) => {
    const { rank, level, xp: experience } = skillsArray.find(
      skill => skill.id === index
    ) || { rank: 0, level: 1, xp: 0 }

    skills[skillName] = {
      rank,
      level,
      experience,
    }
  })

  return skills
}
export const parseJagexPlayerToJSON = (
  jagexPlayer: string
): Jagex.Hiscores.PlayerJSON => {
  const lines = separateIntoLines(jagexPlayer)
  const [skillsStartIndex, skillsEndIndex] = [0, hiscores.skills.length]
  const [activitiesStartIndex, activitiesEndIndex] = [
    hiscores.skills.length,
    hiscores.skills.length + hiscores.activities.length,
  ]

  const activities = formatActivities([
    ...lines.slice(activitiesStartIndex, activitiesEndIndex),
  ])
  const skills = formatSkills([
    ...lines.slice(skillsStartIndex, skillsEndIndex),
  ])

  return {
    activities,
    skills,
  }
}
export const parseJagexClanToArray = (
  jagexClan: string
): Jagex.Clan.Member[] => {
  const lines = separateIntoLines(jagexClan)
  return [...lines.slice(1, -1)]
}

/**
 * Oldschool RuneScape
 */

const formatOSRSSkills = (skillsArray: string[]) => {
  let skills = {} as Jagex.Hiscores.OSRSPlayerSkills;

  osrs.hiscores.skills.map((skillName, index) => {
    const [rank, level, experience] = skillsArray[index].split(",")
    skills[skillName] = {
      rank: parseInt(rank),
      level: parseInt(level),
      experience: parseInt(experience),
    }
  })

  return skills
}
const formatOSRSActivities = (activitiesArray: string[]) => {
  let activities = {} as Jagex.Hiscores.OSRSPlayerActivites;

  osrs.hiscores.activities.map((activityName, index) => {
    const [rank, count] = activitiesArray[index].split(",")
    activities[activityName] = { rank: parseInt(rank), count: parseInt(count) }
  })

  return activities
}
const formatOSRSBosses = (activitiesArray: string[]) => {
  let bosses = {} as Jagex.Hiscores.OSRSPlayerBosses;

  osrs.hiscores.bosses.map((bossName, index) => {
    const [rank, count] = activitiesArray[index].split(",")
    bosses[bossName] = { rank: parseInt(rank), count: parseInt(count) }
  })

  return bosses
}
export const parseJagexOSRSPlayerToJSON = (
  jagexPlayer: string
): Jagex.Hiscores.OSRSPlayerJSON => {
  const lines = separateIntoLines(jagexPlayer)
  const [skillsStartIndex, skillsEndIndex] = [0, osrs.hiscores.skills.length]
  const [activitiesStartIndex, activitiesEndIndex] = [
    osrs.hiscores.skills.length,
    osrs.hiscores.skills.length + osrs.hiscores.activities.length,
  ]
  const [bossesStartIndex, bossesEndIndex] = [
    osrs.hiscores.skills.length + osrs.hiscores.activities.length,
    osrs.hiscores.skills.length +
      osrs.hiscores.activities.length +
      osrs.hiscores.bosses.length,
  ]

  const activities = formatOSRSActivities([
    ...lines.slice(activitiesStartIndex, activitiesEndIndex),
  ])
  const bosses = formatOSRSBosses([
    ...lines.slice(bossesStartIndex, bossesEndIndex),
  ])
  const skills = formatOSRSSkills([
    ...lines.slice(skillsStartIndex, skillsEndIndex),
  ])

  return {
    activities,
    bosses,
    skills,
  }
}
