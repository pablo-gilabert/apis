import { useState } from "react"
import type { FormEvent } from "react"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import {
  getCategories,
  getProducts,
  searchProducts,
} from "../../services/products"

import ProductCard from "../../components/ProductCard/ProductCard"

const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""

  const [searchInput, setSearchInput] = useState(search)

  // Fetches the products according to the current search query.
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", search],

    queryFn: () => {
      return search
        ? searchProducts(search)
        : getProducts()
    },
  })

  // Fetches all available product categories.
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const trimmedSearch = searchInput.trim()

    if (trimmedSearch) {
      setSearchParams({
        search: trimmedSearch,
      })
    } else {
      setSearchParams({})
    }
  }

  const handleClear = () => {
    setSearchInput("")
    setSearchParams({})
  }

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
            key={category}
            type="button"
          >
            {category}
          </button>
        ))}

      </div>

      {data?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </section>
  )
}

export default Products