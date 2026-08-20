import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"

import { IoIosMenu } from "react-icons/io"
import {
  NavLink,
  useLocation,
  useSearchParams,
} from "react-router-dom"

import styles from "./Navbar.module.css"

const Navbar = () => {

  // Provides access to the current URL search parameters.
  const [searchParams, setSearchParams] = useSearchParams()

  // Provides access to the current URL path.
  const location = useLocation()

  // Controls whether the navigation menu is visible.
  const [menuOpen, setMenuOpen] = useState(false)

  // Controls the value currently typed into the search input.
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  )

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

  // Handles the search form submission.
  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    const trimmedSearch = searchInput.trim()

    const params = new URLSearchParams()

    // A new search always starts from page 1.
    params.set("page", "1")

    if (trimmedSearch) {
      params.set("search", trimmedSearch)
    }

    // Preserve the current category when searching from the products page.
    const currentCategory = searchParams.get("category")

    if (
      location.pathname === "/products" &&
      currentCategory
    ) {
      params.set("category", currentCategory)
    }

    // Preserve the current sorting when searching from the products page.
    const currentSort = searchParams.get("sort")

    if (
      location.pathname === "/products" &&
      currentSort
    ) {
      params.set("sort", currentSort)
    }

    // Updates the URL and triggers the products query.
    setSearchParams(params)

    // Close the mobile menu after submitting the search.
    closeMenu()
  }

  // Closes the menu when the user clicks outside the navbar.
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
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
  const handleNavigation = (path: string) => {

    closeMenu()

    if (location.pathname === path) {
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

      <form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
      >

        <input
          className={styles.searchInput}
          type="search"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value)
          }}
          placeholder="Search..."
          aria-label="Search products"
        />

        <button
          className={styles.searchButton}
          type="submit"
          aria-label="Search"
        >
          🔍
        </button>

      </form>

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