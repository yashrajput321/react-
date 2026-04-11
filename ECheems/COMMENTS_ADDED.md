# Comment Documentation

This file documents the comprehensive comments that have been added to the E-Cheems application.

## Files with Comments Added

### 1. src/main.jsx
- Entry point for React application
- Initializes React DOM and renders App component

### 2. src/App.jsx
- Main routing configuration
- Sets up all application routes with authentication
- Imports all page components

### 3. src/components/Header/index.jsx  
- Navigation header component
- Handles user logout and JWT token management
- Provides navigation links to all main pages

### 4. src/components/ProtectedRoute/index.jsx
- Route protection wrapper
- Checks for JWT token and redirects to login if not authenticated
- Wraps protected pages

### 5. src/components/Home/index.jsx
- Landing page component
- Displays welcome message and Shop Now button
- Navigates to products page

### 6. src/components/Products/index.jsx
- Main products page
- Displays product listings with filters
- Combines PrimeDealsSection and AllProductsSection

### 7. src/components/ProductCard/index.jsx
- Individual product card component
- Shows product image, title, brand, price, and rating
- Linked to product details page

### 8. src/components/Cart/index.jsx
- Shopping cart management page
- CRUD operations for cart items
- localStorage persistence with 'cheems_cart' key
- Quantity controls and total calculation
- Checkout navigation

### 9. src/components/NotFound/index.jsx
- 404 error page
- Displayed for invalid routes

### 10. src/components/LoginForm/index.jsx
- User authentication form
- Handles username/password login
- JWT token storage in cookies via js-cookie
- Redirects to home if already authenticated

### 11. src/components/Orders/index.jsx
- Order history page
- Displays all user orders with expandable details
- Features:
  - Download order details as text file
  - Order again functionality (adds items back to cart)
  - Smart cart merging
  - Success notifications
- localStorage keys: 'cheems_orders', 'cheems_cart'

### 12. src/components/ProductItemDetails/index.jsx
- Detailed product view page
- Fetches product data from API
- Features:
  - Quantity adjustment controls
  - Add to cart functionality
  - Button state change (ADD TO CART → GO TO CART)
  - Success notification
  - Related/similar products display
- API based data fetching with status management

### 13. src/components/Checkout/index.jsx
- Complete checkout workflow
- Major Features:
  1. Saved address management
     - Load, select, add, delete addresses
     - Auto-populate form from saved addresses
     - "Save address for next time" checkbox
  2. Coupon system
     - FIRST50 (10% discount)
     - SAVE20 (20% discount)
     - PROMO30 (30% discount)
     - FLAT500 (Rs 500 flat discount)
  3. Order summary with calculations
     - Subtotal calculation
     - Discount application
     - Tax calculation (5%)
     - Final total
  4. Form validation
     - All 8 fields validated
     - Error messages displayed
  5. Order placement
     - Creates order object
     - Auto-saves address if checkbox checked
     - Saves to 'cheems_orders' localStorage
     - Displays confirmation page

### 14. src/components/AllProductSection/index.jsx
- Displays all available products
- Product grid with filtering capabilities
- Category, rating, price filters
- Search functionality
- API based data loading

### 15. src/components/PrimeDealsSection/index.jsx
- Featured/special deals section
- Displays discounted or special offer products
- API based data loading
- Loading and error states

### 16. src/components/FiltersGroup/index.jsx
- Filter sidebar component
- Category filters
- Rating filters
- Price range filters
- Search filter

### 17. src/components/ProductsHeader/index.jsx
- Products page header
- Sort options
- Display controls

### 18. src/components/SimilarProductItem/index.jsx
- Similar products card component
- Shows related products on detail page

## Code Organization Patterns

### State Management
- React hooks (useState, useEffect)
- Local state for component data
- localStorage for persistence

### localStorage Keys
- `cheems_cart`: Shopping cart items
- `cheems_orders`: Order history
- `cheems_saved_addresses`: User addresses

### API Integration
- Fetch API for HTTP requests
- JWT token authentication
- Status constants (INITIAL, IN_PROGRESS, SUCCESS, FAILURE)
- Loading spinners for UX

### Form Handling
- Controlled components
- Real-time validation
- Error message display
- Input state management

### Routing
- React Router DOM v7
- Protected routes with ProtectedRoute wrapper
- Dynamic routes with URL parameters
- Navigation with useNavigate hook

## Comment Conventions

Comments follow these patterns:
- File header comments describe purpose and features
- Function comments explain parameters and return values
- Inline comments clarify complex logic
- JSDoc style for function documentation
- Clear, concise explanation of code purpose

## Build Status

Build: ✅ 78 modules transformed successfully
Production ready with optimized bundle size
