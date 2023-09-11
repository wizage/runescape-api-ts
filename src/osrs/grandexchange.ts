import axios, { AxiosError } from 'axios';

import { grandexchange } from "../configs/oldschool"
import { Item, ItemGraph } from "../lib/runescape"

export const getItem = async (id: number) => {
  if (typeof id !== "number") {
    throw new TypeError("Item ID parameter must be a number")
  }

  try {
    const response = await axios.get(grandexchange.endpoints.item, {
      params: {
        item: id,
      },
    })
    return new Item(response.data['item'])
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Item not found')
      }
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
}

export const getItemGraph = async (id: number) => {
  if (typeof id !== "number") {
    throw new TypeError("Item ID parameter must be a number")
  }

  try {
    const response = await axios.get(
      `${grandexchange.endpoints.itemGraph}/${id}.json`
    );

    return new ItemGraph(id, response.data)
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Item not found')
      }
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
}
