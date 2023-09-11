import axios, { AxiosError } from 'axios';
import { clan } from "../configs/runescape"
import { ClanMember } from "../lib/runescape"
import { Jagex } from "../types"
import { parseJagexClanToArray } from "../utils/Jagex"

export const getMembers = async (search: string) => {
  if (typeof search !== "string") {
    throw new TypeError("Search parameter must be a string")
  }

  try {
    const members = await axios.get(clan.endpoints.members, {
      params: {
        clanName: search,
      },
    })

    const membersArray = parseJagexClanToArray(members.data)

    return membersArray.map(
      (member: Jagex.Clan.Member) => new ClanMember(member)
    )
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Clan not found')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}
