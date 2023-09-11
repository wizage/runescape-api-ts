import axios, { AxiosError } from 'axios';
import { miscellaneous } from "../configs/runescape"
import { Jagex } from '../types';

export const getAvatar = async (name: string) => {
  if (typeof name !== "string") {
    return new TypeError("Search parameter must be a string")
  }

  try {
    const response = await axios.get(
      `https://secure.runescape.com/m=avatar-rs/g=runescape/${encodeURI(
        name
      )}/chat.png`
    )
    return response.request.res.responseUrl as string;
  } catch (error) {
    return miscellaneous.endpoints.defaultAvatarUrl
  }
}

export const getTotalUsers = async () => {
  try {
    const response = await axios.get(miscellaneous.endpoints.totalUsers)
    return response.data as Jagex.Miscellaneous.TotalUsers;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Player Count not found')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}
