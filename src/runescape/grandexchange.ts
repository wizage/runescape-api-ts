import axios, { AxiosError } from 'axios';
import { grandexchange } from "../configs/runescape"
import { GrandExchangeCategory, Item, ItemGraph } from "../lib/runescape"
import { AlphaNumeric } from "../types"

export const getCategories = async () => {
  return await new Promise<GrandExchangeCategory[]>(resolve =>
    resolve(
      grandexchange.categories.map(
        category => new GrandExchangeCategory(category)
      )
    )
  )
}

export const getCategoryCounts = async (
  category: number | GrandExchangeCategory
) => {
  if (
    typeof category !== "number" &&
    category.constructor.name !== "GrandExchangeCategory"
  ) {
    throw new TypeError(
      "Category parameter must be a number or GrandExchangeCategory instance"
    )
  }

  let categoryId: number | undefined = undefined

  if (typeof category === "number") {
    categoryId = category
  } else {
    categoryId = category.id
  }

  try {
    const response = await axios.get(grandexchange.endpoints.category, {
      params: {
        category: categoryId,
      },
    })

    return response.data.alpha;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404){
        throw new Error('Category not found')
      }
      throw new Error(error.message);

    } else {
      throw error;
    }
  }
}

export const getCategoryCountsByPrefix = async (
  categoryId: number | GrandExchangeCategory,
  prefix: AlphaNumeric,
  page = 1
) => {
  if (
    typeof categoryId !== "number" &&
    categoryId.constructor.name !== "GrandExchangeCategory"
  ) {
    throw new TypeError(
      "Category parameter must be a number or GrandExchangeCategory instance"
    )
  }

  let category: number | undefined = undefined
  let alpha: string | undefined = undefined

  if (typeof categoryId === "number") {
    category = categoryId
  } else {
    category = categoryId.id
  }

  if (typeof prefix === "number") {
    alpha = encodeURIComponent("#")
  } else {
    alpha = prefix.toLowerCase()
  }

  try {
    const response = await axios.get(grandexchange.endpoints.categoryItems, {
      params: {
        category,
        alpha,
        page,
      },
    })

    return response.data.items;
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