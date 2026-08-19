import { Route, Routes } from "react-router-dom"

import Products from "./pages/Products/Products"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"

function App() {

  return (

    <>
      <Navbar/>

      <Routes>

        <Route 
          path="/"
          element={<Home/>}
        />

        <Route
          path="/products"
          element={<Products/>}
        />

        <Route
          path="/products/:id"
          element={<ProductDetail/>}
        />

      </Routes>
    </>
  )
}

export default App