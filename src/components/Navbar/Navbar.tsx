import { useEffect, useRef, useState } from "react"

import { IoIosMenu } from "react-icons/io"
import { FaShoppingCart } from "react-icons/fa"

import {
  NavLink,
  useLocation,
} from "react-router-dom"

import { useCart } from "../../CartContext/useCart"

import styles from "./Navbar.module.css"

const Navbar = () => {

  // Provides access to the current URL path.
  const location = useLocation()

  // Provides access to the current cart state.
  const { items } = useCart()

  // Calculates the total number of units in the cart.
  const cartCount = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  // Controls whether the navigation menu is visible.
  const [menuOpen, setMenuOpen] = useState(false)

  // Stores a reference to the navbar element to detect clicks outside it.
  const navbarRef = useRef<HTMLElement>(null)

  // Toggles the navigation menu between open and closed states.
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  // Closes the navigation menu.
  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Closes the menu when the user clicks outside the navbar.
  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        navbarRef.current &&
        !navbarRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false)
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )

    }

  }, [])

  // Handles navigation links.
  //
  // If the user clicks the link corresponding to the
  // current route, scroll back to the top instead of
  // navigating to the same route again.
  const handleNavigation = (
    path: string
  ) => {

    closeMenu()

    if (
      location.pathname === path
    ) {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

    }

  }

  return (

    <nav
      ref={navbarRef}
      className={styles.navbar}
    >

      <h1 className={styles.title}>
        Dummy Data
      </h1>

      <NavLink
        className={styles.cart}
        to="/cart"
        aria-label={`Cart with ${cartCount} items`}
      >

        <FaShoppingCart />

        {cartCount > 0 && (
          <span className={styles.cartCount}>
            {cartCount}
          </span>
        )}

      </NavLink>

      <button
        className={styles.menu}
        type="button"
        onClick={toggleMenu}
        aria-label={
          menuOpen
            ? "Close menu"
            : "Open menu"
        }
        aria-expanded={menuOpen}
      >
        <IoIosMenu />
      </button>

      <div
        className={`${styles.dropdown} ${
          menuOpen
            ? styles.dropdownOpen
            : ""
        }`}
      >

        <NavLink
          className={styles.link}
          to="/"
          onClick={() => {
            handleNavigation("/")
          }}
        >
          Home
        </NavLink>

        <NavLink
          className={styles.link}
          to="/products"
          onClick={() => {
            handleNavigation("/products")
          }}
        >
          Products
        </NavLink>

      </div>

    </nav>
  )
}

export default Navbar