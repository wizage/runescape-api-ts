
import axios, { AxiosError } from 'axios';
import { hiscores } from "../configs/runescape";
import { Player } from "../lib/runescape";
import { parseJagexPlayerToJSON } from "../utils/Jagex";

// type GetPlayerOptions = {
//   gamemode: typeof hiscores.gamemodes[number]
// }

// TODO: Handle 404 (player does not exist) response
export const getPlayer = async (
  name: string,
  gamemode: typeof hiscores.gamemodes[number] = "normal"
) => {
  if (typeof name !== "string") {
    throw new TypeError("Player name parameter must be a string")
  }

  if (![...hiscores.gamemodes].includes(gamemode)) {
    throw new Error(
      `Invalid gamemode selected. Available options are: ${hiscores.gamemodes.join(
        " | "
      )}`
    )
  }
  try {
    const response = await axios.get(hiscores.endpoints[gamemode], {
      params: {
        player: name
      }
    })
    const player = parseJagexPlayerToJSON(response.data);
    return new Player(name, player);
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

export const getPlayerRaw = async (
  name: string,
  gamemode: typeof hiscores.gamemodes[number] = "normal"
) => {
  if (typeof name !== "string") {
    throw new TypeError("Player name parameter must be a string")
  }

  if (![...hiscores.gamemodes].includes(gamemode)) {
    throw new Error(
      `Invalid gamemode selected. Available options are: ${hiscores.gamemodes.join(
        " | "
      )}`
    )
  }
  try {
    const response = await axios.get(hiscores.endpoints[gamemode], {
      params: {
        player: name
      }
    });
    const lines: number[][] = response.data.split(/\n/).map((line:string) => line.split(',').map((value) => Number(value)));
    
    // Slice off the end since the extra '/n'
    return lines.slice(0, lines.length-1);
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