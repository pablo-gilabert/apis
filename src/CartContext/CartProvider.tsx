import {
  useEffect,
  useReducer,
  type ReactNode,
} from "react"

import type { Product } from "../types/Product"

import {
  cartReducer,
  initialCartState,
} from "./cartReducer"

import {
  CartActionType,
} from "./cartActions"

import {
  CartContext,
} from "./cartContext"

interface CartProviderProps {
  children: ReactNode
}

const CART_STORAGE_KEY = "cart"

const getInitialCartState = () => {

  const storedCart =
    localStorage.getItem(
      CART_STORAGE_KEY
    )

  if (!storedCart) {
    return initialCartState
  }

  try {

    const parsedCart =
      JSON.parse(storedCart)

    if (
      !parsedCart ||
      !Array.isArray(parsedCart.items)
    ) {
      return initialCartState
    }

    return parsedCart

  } catch {

    return initialCartState
  }
}

export const CartProvider = ({
  children,
}: CartProviderProps) => {

  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCartState
  )

  const addItem = (
    product: Product
  ) => {

    dispatch({
      type: CartActionType.ADD_ITEM,
      payload: product,
    })
  }

  const removeItem = (
    productId: number
  ) => {

    dispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: productId,
    })
  }

  const clearItem = (
    productId: number
  ) => {

    dispatch({
      type: CartActionType.CLEAR_ITEM,
      payload: productId,
    })
  }

  const clearCart = () => {

    dispatch({
      type: CartActionType.CLEAR_CART,
    })
  }

  useEffect(() => {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state)
    )

  }, [state])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}