import {
  useCart,
} from "../../CartContext/useCart"

import styles from "./CartSummary.module.css"

const CartSummary = () => {

  const {
    items,
    clearCart,
  } = useCart()

  const subtotal = items.reduce<number>(
    (sum, item) =>
      sum +
      item.product.price *
      item.quantity,
    0
  )

  return (

    <section className={styles.summary}>

      <h2 className={styles.title}>
        Order summary
      </h2>

      <div className={styles.row}>

        <span>
          Subtotal
        </span>

        <span>
          $ {subtotal.toFixed(2)}
        </span>

      </div>

      <div className={styles.row}>

        <span>
          Shipping
        </span>

        <span>
          Free
        </span>

      </div>

      <div className={styles.total}>

        <span>
          Total
        </span>

        <span>
          $ {subtotal.toFixed(2)}
        </span>

      </div>

      <button
        className={styles.checkoutButton}
        type="button"
      >
        Checkout
      </button>

      <button
        className={styles.clearButton}
        type="button"
        onClick={clearCart}
      >
        Clear cart
      </button>

    </section>
  )
}

export default CartSummary