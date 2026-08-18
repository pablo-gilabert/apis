import { Route, Routes } from "react-router-dom"

import Products from "./pages/Products/Products"
import ProductDetail from "./pages/ProductDetail/ProductDetail"

function App() {

  return (
    <Routes>

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetail />}
      />

    </Routes>
  )
}

export default App