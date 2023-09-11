import axios, { AxiosError } from 'axios';
import { runemetrics } from "../configs/runescape"
import {
  Quest,
  RuneMetricsMonthlyExperience,
  RuneMetricsProfile,
  Skill,
} from "../lib/runescape"
import { Jagex } from "../types"

export const getMonthlyXp = async (name: string, skill: number | Skill) => {
  if (typeof name !== "string") {
    throw new TypeError("Player name parameter must be a string")
  }

  if (typeof skill !== "number" && skill.constructor.name !== "Skill") {
    throw new TypeError("Skill parameter must be a number or Skill instance")
  }

  let skillId: number | undefined = undefined

  if (typeof skill === "number") {
    skillId = skill
  } else {
    skillId = skill.id
  }

  try {
    const response = await axios.get(runemetrics.endpoints.monthlyXp, {
      params: {
        searchName: name,
        skillid: skillId,
      },
    })

    return new RuneMetricsMonthlyExperience(response.data.monthlyXpGain[0])
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Player not found/Profile might be private')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}

export const getProfile = async (name: string) => {
  if (typeof name !== "string") {
    throw new TypeError("Player name parameter must be a string")
  }

  try {
    const profile = await axios.get(runemetrics.endpoints.profile, {
      params: {
        activities: 20,
        user: name,
      },
    })

    return new RuneMetricsProfile(profile.data)
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Player not found')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}

export const getQuests = async (name: string) => {
  if (typeof name !== "string") {
    throw new TypeError("Player name parameter must be a string")
  }

  try {
    const response = await axios.get(runemetrics.endpoints.quests, {
      params: {
        user: name,
      },
    })
    const quests = response.data as Jagex.RuneMetrics.Quests;
    return quests.quests.map(quest => new Quest(quest))
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Player not found')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}
