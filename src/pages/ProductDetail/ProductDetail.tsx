import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { getProduct } from "../../services/products"

const ProductDetail = () => {

  const { id } = useParams()

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
    enabled: !!id,
  })

  if (isLoading) {
    return <p>Loading product...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (!data) {
    return <p>Product not found.</p>
  }

  return (
    <main>

      <img
        src={data.thumbnail}
        alt={data.title}
      />

      <h1>{data.title}</h1>

      <p>{data.description}</p>

      <p>${data.price}</p>

    </main>
  )
}

export default ProductDetail