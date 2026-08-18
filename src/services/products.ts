import type { Category } from "../types/Category"
import type { Product } from "../types/Product"

export const getProducts = async (): Promise<Product[]> => {

  const response = await fetch("https://dummyjson.com/products")

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await response.json()

  return data.products
}

export const getProduct = async (id: number): Promise<Product> => {

  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

export const searchProducts = async (
  query: string
): Promise<Product[]> => {

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error("Failed to search products")
  }

  const data = await response.json()

  return data.products
}

export const getCategories = async (): Promise<Category[]> => {

  const response = await fetch(
    "https://dummyjson.com/products/categories"
  )

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {

  const response = await fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products by category")
  }

  const data = await response.json()

  return data.products
}