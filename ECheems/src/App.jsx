// App component - Main router configuration with all application routes
// Uses protected routes to ensure only authenticated users can access pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route 
      path="/login" element={
          <LoginForm />
      } 
      />

      <Route
       path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
       } 
       />

      <Route
       path="/products/:id" element={
         <ProtectedRoute>
           <ProductItemDetails />
         </ProtectedRoute>
       }
      />

      <Route
       path="/products" element={
       <ProtectedRoute>
       <Products />
       </ProtectedRoute>
       }
        />

      <Route
       path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
       }
        />

      <Route
       path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
       }
        />

      <Route
       path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
       }
        />

      <Route
       path="*" element={
       <ProtectedRoute>
       <NotFound />
       </ProtectedRoute>
       }
        />
    </Routes>
  </BrowserRouter>
)

export default App