import { useEffect, useRef, useState } from "react"

import { IoIosMenu } from "react-icons/io"
import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.css"

const Navbar = () => {

  // Controls whether the navigation menu is visible.
  const [menuOpen, setMenuOpen] = useState(false)

  // Stores a reference to the navbar element to detect clicks outside it.
  const navbarRef = useRef<HTMLElement>(null)

  // Toggles the navigation menu between open and closed states.
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  // Closes the menu after selecting a navigation link.
  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Closes the menu when the user clicks outside the navbar.
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)) 
        {setMenuOpen(false)}

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }}, [])

  return (

    <nav ref={navbarRef} className={styles.navbar}>

        <h1 className={styles.title}>
            Dummy Data
        </h1>

        <button
            className={styles.menu}
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}>
            <IoIosMenu/>
        </button>

        <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}>

            <NavLink
                className={styles.link}
                to="/"
                onClick={closeMenu}>
                Home
            </NavLink>

            <NavLink
                className={styles.link}
                to="/products"
                onClick={closeMenu}>
                Products
            </NavLink>

        </div>

    </nav>
  )
}

export default Navbar