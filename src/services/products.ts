import type { Product } from "../types/Product"

export const getProducts = async () : Promise<Product[]> => {

  const response = await fetch("https://dummyjson.com/products")

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await response.json()

  return data.products
}