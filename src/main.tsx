import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import { BrowserRouter } from "react-router-dom"

import App from "./App"

import { ApiError } from "./services/api"

import { CartProvider } from "./CartContext/CartProvider"

import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {

        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false
        }

        return failureCount < 2
      },

      refetchOnWindowFocus: false,
    },
  },
})

createRoot(
  document.getElementById("root")!
).render(

  <StrictMode>

    <BrowserRouter>

      <QueryClientProvider
        client={queryClient}
      >

        <CartProvider>
          <App />
        </CartProvider>

      </QueryClientProvider>

    </BrowserRouter>

  </StrictMode>
)