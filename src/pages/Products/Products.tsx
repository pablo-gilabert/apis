import { useState } from "react"
import type { FormEvent } from "react"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../../services/products"

import ProductCard from "../../components/ProductCard/ProductCard"

const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ""
  const sort = searchParams.get("sort") ?? ""

  const [searchInput, setSearchInput] = useState(search)

  // Fetches products according to the selected category and search query.
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", search, category],

    queryFn: async () => {

      let products

      if (category) {
        products = await getProductsByCategory(category)
      } else if (search) {
        products = await searchProducts(search)
      } else {
        products = await getProducts()
      }

      // When both filters are active, the search is applied
      // to the products returned by the selected category.
      if (category && search) {

        const normalizedSearch = search.toLowerCase()

        products = products.filter((product) =>
          product.title.toLowerCase().includes(normalizedSearch)
        )
      }

      return products
    },
  })

  // Fetches the available product categories.
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  // Updates the search parameter when the form is submitted.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const trimmedSearch = searchInput.trim()

    const params: Record<string, string> = {}

    if (trimmedSearch) {
      params.search = trimmedSearch
    }

    if (category) {
      params.category = category
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  // Clears the current search while keeping the selected filters.
  const handleClear = () => {

    setSearchInput("")

    const params: Record<string, string> = {}

    if (category) {
      params.category = category
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  // Updates the URL with the selected category while preserving
  // the current search and sort options.
  const handleCategoryChange = (selectedCategory: string) => {

    const params: Record<string, string> = {
      category: selectedCategory,
    }

    if (search) {
      params.search = search
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  // Clears the selected category while preserving
  // the current search and sort options.
  const handleCategoryClear = () => {

    const params: Record<string, string> = {}

    if (search) {
      params.search = search
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  // Updates the sort parameter while preserving
  // the current search and category.
  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const selectedSort = event.target.value

    const params: Record<string, string> = {}

    if (search) {
      params.search = search
    }

    if (category) {
      params.category = category
    }

    if (selectedSort) {
      params.sort = selectedSort
    }

    setSearchParams(params)
  }

  // Creates a new array before sorting so the data returned by
  // TanStack Query is not mutated directly.
  const sortedProducts = data
    ? [...data].sort((a, b) => {

        switch (sort) {

          case "price-asc":
            return a.price - b.price

          case "price-desc":
            return b.price - a.price

          case "rating-desc":
            return b.rating - a.rating

          case "rating-asc":
            return a.rating - b.rating

          case "title-asc":
            return a.title.localeCompare(b.title)

          case "title-desc":
            return b.title.localeCompare(a.title)

          default:
            return 0
        }

      })
    : []

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (

    <section>

      <form onSubmit={handleSubmit}>

        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search products..."
        />

        <button type="submit">
          Search
        </button>

        {search && (
          <button
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        )}

      </form>

      <div>

        {categoriesLoading && (
          <p>Loading categories...</p>
        )}

        {categoriesError && (
          <p>Failed to load categories.</p>
        )}

        {categories?.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => handleCategoryChange(category.slug)}
          >
            {category.name}
          </button>
        ))}

        {category && (
          <button
            type="button"
            onClick={handleCategoryClear}
          >
            All products
          </button>
        )}

      </div>

      <div>

        <label htmlFor="sort">
          Sort by:
        </label>

        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="">
            Default
          </option>

          <option value="price-asc">
            Price: Low to High
          </option>

          <option value="price-desc">
            Price: High to Low
          </option>

          <option value="rating-desc">
            Rating: Highest
          </option>

          <option value="rating-asc">
            Rating: Lowest
          </option>

          <option value="title-asc">
            Name: A to Z
          </option>

          <option value="title-desc">
            Name: Z to A
          </option>
        </select>

      </div>

      <div>

        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  )
}

export default Products