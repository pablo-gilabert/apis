import { useQuery } from "@tanstack/react-query"
import { useParams} from "react-router-dom"

import { getProduct } from "../../services/products"

import styles from "./ProductDetail.module.css"

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
    <main className={styles.main}>

      <img 
        className={styles.image}
        src={data.thumbnail}
        alt={data.title}
      />

      <h1 
        className={styles.title}>
        {data.title}
      </h1>

      <p 
        className={styles.description}>
        {data.description}
      </p>

      <button className={styles.buttonCart}>
        Add to cart
      </button>

    </main>
  )
}

export default ProductDetail