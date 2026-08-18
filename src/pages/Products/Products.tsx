import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../../services/products"

import type { ProductSort } from "../../services/products"

import ProductCard from "../../components/ProductCard/ProductCard"

const PRODUCTS_PER_PAGE = 12

const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ""
  const sort = (searchParams.get("sort") ?? "") as ProductSort

  const currentPage = Number(
    searchParams.get("page") ?? "1"
  )

  const page = currentPage > 0 ? currentPage : 1

  const skip = (page - 1) * PRODUCTS_PER_PAGE

  const [searchInput, setSearchInput] = useState(search)

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      "products",
      search,
      category,
      sort,
      page,
    ],

    queryFn: async () => {

      if (category) {

        return getProductsByCategory(
          category,
          PRODUCTS_PER_PAGE,
          skip,
          sort
        )
      }

      if (search) {

        return searchProducts(
          search,
          PRODUCTS_PER_PAGE,
          skip,
          sort
        )
      }

      return getProducts({
        limit: PRODUCTS_PER_PAGE,
        skip,
        sort,
      })
    },

    placeholderData: (previousData) => previousData,
  })

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    const trimmedSearch = searchInput.trim()

    const params: Record<string, string> = {
      page: "1",
    }

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

  const handleClear = () => {

    setSearchInput("")

    const params: Record<string, string> = {
      page: "1",
    }

    if (category) {
      params.category = category
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  const handleCategoryChange = (
    selectedCategory: string
  ) => {

    const params: Record<string, string> = {
      category: selectedCategory,
      page: "1",
    }

    if (search) {
      params.search = search
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  const handleCategoryClear = () => {

    const params: Record<string, string> = {
      page: "1",
    }

    if (search) {
      params.search = search
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {

    const selectedSort = event.target.value as ProductSort

    const params: Record<string, string> = {
      page: "1",
    }

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

  const handlePageChange = (
    newPage: number
  ) => {

    const params: Record<string, string> = {
      page: String(newPage),
    }

    if (search) {
      params.search = search
    }

    if (category) {
      params.category = category
    }

    if (sort) {
      params.sort = sort
    }

    setSearchParams(params)
  }

  const totalPages = data
    ? Math.ceil(data.total / PRODUCTS_PER_PAGE)
    : 0

  const hasPreviousPage = page > 1
  const hasNextPage = page < totalPages

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

      {isFetching && (
        <p>Updating products...</p>
      )}

      <div>

        {data?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {totalPages > 1 && (

        <nav>

          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPreviousPage}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>

        </nav>

      )}

    </section>
  )
}

export default Products