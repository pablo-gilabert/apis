import { useQuery } from "@tanstack/react-query"

import { getProducts } from "../../services/products"

import ProductCard from "../../components/ProductCard/ProductCard"

const Products = () => {

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <section>

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