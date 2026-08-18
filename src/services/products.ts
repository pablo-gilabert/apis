import type { Category } from "../types/Category"
import type { Product } from "../types/Product"
import type { ProductResponse } from "../types/ProductResponse"

export type ProductSort =
  | ""
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "rating-asc"
  | "title-asc"
  | "title-desc"

interface FetchProductsParams {
  limit: number
  skip: number
  sort?: ProductSort
}

const getSortParams = (sort: ProductSort) => {

  switch (sort) {

    case "price-asc":
      return {
        sortBy: "price",
        order: "asc",
      }

    case "price-desc":
      return {
        sortBy: "price",
        order: "desc",
      }

    case "rating-desc":
      return {
        sortBy: "rating",
        order: "desc",
      }

    case "rating-asc":
      return {
        sortBy: "rating",
        order: "asc",
      }

    case "title-asc":
      return {
        sortBy: "title",
        order: "asc",
      }

    case "title-desc":
      return {
        sortBy: "title",
        order: "desc",
      }

    default:
      return {}
  }
}

export const getProducts = async ({
  limit,
  skip,
  sort = "",
}: FetchProductsParams): Promise<ProductResponse> => {

  const sortParams = getSortParams(sort)

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })

  if (sortParams.sortBy) {
    params.set("sortBy", sortParams.sortBy)
  }

  if (sortParams.order) {
    params.set("order", sortParams.order)
  }

  const response = await fetch(
    `https://dummyjson.com/products?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

export const getProduct = async (
  id: number
): Promise<Product> => {

  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

export const searchProducts = async (
  query: string,
  limit: number,
  skip: number,
  sort: ProductSort = ""
): Promise<ProductResponse> => {

  const sortParams = getSortParams(sort)

  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    skip: String(skip),
  })

  if (sortParams.sortBy) {
    params.set("sortBy", sortParams.sortBy)
  }

  if (sortParams.order) {
    params.set("order", sortParams.order)
  }

  const response = await fetch(
    `https://dummyjson.com/products/search?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Failed to search products")
  }

  return response.json()
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
  category: string,
  limit: number,
  skip: number,
  sort: ProductSort = ""
): Promise<ProductResponse> => {

  const sortParams = getSortParams(sort)

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })

  if (sortParams.sortBy) {
    params.set("sortBy", sortParams.sortBy)
  }

  if (sortParams.order) {
    params.set("order", sortParams.order)
  }

  const response = await fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products by category")
  }

  return response.json()
}