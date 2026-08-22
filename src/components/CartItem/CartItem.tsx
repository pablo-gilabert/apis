import type { CartItem as CartItemType } from "../../types/CartItem"

import {
  useCart,
} from "../../CartContext/useCart"

import styles from "./CartItem.module.css"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({
  item,
}: CartItemProps) => {

  const {
    addItem,
    removeItem,
    clearItem,
  } = useCart()

  return (

    <article className={styles.item}>

      <img
        className={styles.image}
        src={item.product.thumbnail}
        alt={item.product.title}
      />

      <div className={styles.info}>

        <h2 className={styles.title}>
          {item.product.title}
        </h2>

        <p className={styles.price}>
          $ {item.product.price.toFixed(2)}
        </p>

        <div className={styles.quantity}>

          <button
            className={styles.quantityButton}
            type="button"
            onClick={() =>
              removeItem(item.product.id)
            }
            aria-label={`Decrease quantity of ${item.product.title}`}
          >
            −
          </button>

          <span className={styles.quantityValue}>
            {item.quantity}
          </span>

          <button
            className={styles.quantityButton}
            type="button"
            onClick={() =>
              addItem(item.product)
            }
            aria-label={`Increase quantity of ${item.product.title}`}
          >
            +
          </button>

        </div>

      </div>

      <button
        className={styles.removeButton}
        type="button"
        onClick={() =>
          clearItem(item.product.id)
        }
      >
        Remove
      </button>

    </article>
  )
}

export default CartItem