import type { Product } from "../../types/Product"

import { Link } from "react-router-dom"

import styles from "./ProductCard.module.css"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product } : ProductCardProps) => {

  return (

  <Link to={`/products/${product.id}`}>
    <article className={styles.card}>

      <img
        className={styles.image}
        src={product.thumbnail}
        alt={product.title}
      />

      <h2 className={styles.title}>
        {product.title}
      </h2>

      <p className={styles.description}>
        {product.description}
      </p>

      <span className={styles.price}>
        ${product.price}
      </span>

    </article>
  </Link>
  )
}

export default ProductCard