# ECheems - E-Commerce Store

## Description
ECheems is a feature-rich e-commerce web application built with React 19 and Vite. It provides a complete shopping experience with user authentication, product browsing, advanced checkout with saved addresses, coupon system, order management, and much more. The application is fully responsive and optimized for both desktop and mobile devices.

## Features

### Core E-Commerce Features
- **User Authentication**: Secure login functionality with JWT token management using js-cookie
- **Home Page**: Landing page with prime deals and featured products
- **Product Listing**: Browse all products with detailed information
- **Product Details**: View complete product specifications and images
- **Shopping Cart**: Add/remove items, adjust quantities, manage purchases
- **Wishlist Support**: Mark products as favorites (future enhancement ready)

### Checkout & Order Management
- **Advanced Checkout Page**:
  - User details form with validation (name, email, phone, address)
  - Saved addresses management - add, select, and delete multiple addresses
  - Auto-populate form from previously saved addresses
  - Address reuse feature for faster checkout
  - "Save this address for next time" checkbox preference
  
- **Coupon System**:
  - Multiple discount codes: FIRST50 (10%), SAVE20 (20%), PROMO30 (30%), FLAT500 (Rs 500 flat discount)
  - Real-time price calculation with applied discounts
  - Tax calculation (5% on subtotal after discount)
  - Support for both percentage-based and flat amount discounts
  
- **Order Confirmation**:
  - Order placement confirmation with all details
  - Automatic navigation to order history
  - Payment status display

### Order History & Management
- **My Orders Page**:
  - View all previous orders in chronological order
  - Expandable order cards with detailed information
  - Order items display with images and pricing
  - Price breakdown (subtotal, discount, tax, final amount)
  - Shipping address display
  - Download order details as text file
  - Order again functionality - adds all items from previous order to cart
  - Empty state with "Start Shopping" button if no orders

- **Order Again Feature**:
  - One-click reorder of previous orders
  - Smart cart merging (increases quantity if item already in cart)
  - Success notification with item count
  - Auto-redirect to cart after notification

### Navigation & UI
- **Header Navigation**:
  - Logo with home link
  - Navigation menu: Home, Products, Cart, **My Orders**
  - Quick logout button
  - Mobile-responsive design
  
- **404 Page**: Custom not found page for invalid routes
- **Protected Routes**: Secure page access for authenticated users only

### Data Persistence
- **Local Storage**:
  - `cheems_cart`: Shopping cart items
  - `cheems_orders`: Order history
  - `cheems_saved_addresses`: User's saved shipping addresses
  
- All data persists across browser sessions and tabs

### Responsive Design
- **Desktop (1024px+)**: Full layout with all features
- **Tablet (768px-1023px)**: Optimized grid and spacing
- **Mobile (<768px)**: Compact design with touch-friendly buttons
- Built with custom CSS for pixel-perfect responsive design

## Tech Stack
- **Frontend Framework**: React 19 with Functional Components and Hooks
- **Routing**: React Router DOM v7 with protected routes
- **Styling**: Custom CSS with responsive design (no CSS framework)
- **Build Tool**: Vite v8 with optimized production build
- **State Management**: React Hooks (useState, useEffect, useNavigate)
- **Authentication**: JWT tokens with js-cookie
- **Data Storage**: Browser Local Storage for persistence
- **Code Quality**: ESLint with modern JavaScript standards
- **Development Server**: Vite dev server with HMR (Hot Module Replacement)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ECheems
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Usage Guide

### User Authentication
1. Visit the `/login` page
2. Enter login credentials
3. JWT token is stored in cookies for session management
4. Access authenticated routes (checkout, orders, etc.)

### Shopping Flow
1. **Browse Products**:
   - Navigate to `/products` from header
   - View product details by clicking on a product
   - Add items to cart with "ADD TO CART" button

2. **Manage Cart**:
   - Visit `/cart` to view cart items
   - Adjust quantities using +/- buttons
   - Remove items as needed
   - Click "Proceed to Checkout" to continue

3. **Checkout Process**:
   - **Address Management**:
     - Select from previously saved addresses (if available)
     - Click "Add New Address" to enter new shipping details
     - Form requires: First Name, Last Name, Email, Phone, Address, City, State (2 letters), Pincode (6 digits)
     - Toggle "Save this address for next time" checkbox to save for future orders
   
   - **Coupon Codes** (Optional):
     - Click "Apply Coupon Code"
     - Enter one of: `FIRST50`, `SAVE20`, `PROMO30`, or `FLAT500`
     - Choose between percentage or flat discount codes
     - Applied discount shows immediately in order summary
   
   - **Order Summary**:
     - View subtotal, discount amount, tax, and final total
     - All calculations update in real-time
     - Tax is 5% on subtotal after discount
   
   - **Place Order**:
     - Click "Place Order" button
     - Order confirmation page displays with order details
     - Order is saved to order history

4. **View Orders**:
   - Click "My Orders" in header navigation
   - Expand order cards to view details
   - See: items, pricing breakdown, shipping address
   - Actions available:
     - **Download Details**: Save order as text file
     - **Order Again**: Add all items from order to cart instantly

### Coupons Available
| Code | Type | Amount | Discount |
|------|------|--------|----------|
| FIRST50 | Percentage | 10% | 10% off |
| SAVE20 | Percentage | 20% | 20% off |
| PROMO30 | Percentage | 30% | 30% off |
| FLAT500 | Flat Amount | Rs 500 | Rs 500 off |

## Project Structure

```
src/
├── components/
│   ├── Header/                 # Navigation header with My Orders link
│   ├── Home/                   # Landing page with featured products
│   ├── Products/               # Products listing page
│   ├── ProductCard/            # Individual product card component
│   ├── ProductItemDetails/     # Detailed product view
│   ├── Cart/                   # Shopping cart management
│   ├── Checkout/               # Checkout with address & coupon management
│   ├── Orders/                 # Order history and details
│   ├── LoginForm/              # User authentication
│   ├── ProtectedRoute/         # Route protection wrapper
│   ├── AllProductSection/      # Product section layout
│   ├── PrimeDealsSection/      # Featured deals section
│   └── NotFound/               # 404 page
├── assets/                     # Images and static files
├── App.jsx                     # Main app component with routing
└── main.jsx                    # Entry point
```

## Local Storage Keys
The application uses localStorage to persist user data:

- **`cheems_cart`**: Array of cart items with id, title, price, quantity, image
  ```json
  [
    {
      "id": "product-id",
      "title": "Product Name",
      "price": 299,
      "quantity": 2,
      "image": "image-url"
    }
  ]
  ```

- **`cheems_orders`**: Array of completed orders
  ```json
  [
    {
      "orderId": "ORDER123",
      "orderDate": "12/04/2024",
      "orderTime": "2:30 PM",
      "items": [...],
      "firstName": "John",
      "email": "john@example.com",
      "total": 1299,
      "status": "Confirmed"
    }
  ]
  ```

- **`cheems_saved_addresses`**: Array of saved shipping addresses
  ```json
  [
    {
      "id": 1711234567890,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "pincode": "100001",
      "createdAt": "2024-04-12T14:30:00Z"
    }
  ]
  ```

## Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR). Access the app at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder. The build is minified and optimized for performance.

### Preview Build
```bash
npm run preview
```
Preview the production build locally before deploying.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality and style compliance.

## Routes

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/login` | LoginForm | ❌ | User authentication |
| `/` | Home | ❌ | Landing page |
| `/products` | Products | ✅ | Product listing |
| `/product/:id` | ProductItemDetails | ✅ | Product details |
| `/cart` | Cart | ✅ | Shopping cart |
| `/checkout` | Checkout | ✅ | Checkout process |
| `/orders` | Orders | ✅ | Order history |
| `/*` | NotFound | ❌ | 404 page |

## Form Validation

### Checkout Form
All fields include client-side validation:

- **First Name**: Required, alphanumeric only
- **Last Name**: Required, alphanumeric only
- **Email**: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Phone**: Required, exactly 10 digits
- **Address**: Required, minimum 5 characters
- **City**: Required, alphabetic characters only
- **State**: Required, exactly 2 uppercase letters (e.g., "NY", "CA")
- **Pincode**: Required, exactly 6 digits

Validation messages appear below each field when validation fails.

## Key Features Details

### Cart Management
- Items persist in localStorage across sessions
- Real-time total calculation
- Quantity can be adjusted from 1 to unlimited
- Remove individual items from cart
- Clear all items (via navigation away and refreshing)

### Checkout Features
1. **Address Management**:
   - Save unlimited addresses
   - Auto-populate form from saved addresses
   - Delete unwanted addresses
   - View address preview when selecting

2. **Coupon System**:
   - Apply single coupon per order
   - Real-time discount calculation
   - Remove coupon before placing order
   - Support for both % and flat amount discounts

3. **Price Calculation**:
   - Subtotal = Sum of (price × quantity) for all items
   - Discount = Applied coupon discount amount
   - Taxable Amount = Subtotal - Discount
   - Tax = Taxable Amount × 5%
   - Total = Subtotal - Discount + Tax

### Order Management
- Orders stored permanently in localStorage
- Download order details as text file with formatting
- Order again functionality merges items with existing cart
- Orders displayed in reverse chronological order (newest first)
- Expandable order cards with accordion animation

## Build Output

The production build generates:
- **HTML**: `dist/index.html` (gzipped: ~0.31 KB)
- **CSS**: `dist/assets/index-xxxxx.css` (gzipped: ~7 KB)
- **JavaScript**: `dist/assets/index-xxxxx.js` (gzipped: ~102 KB)
- **Images**: Optimized product and logo images
- **Total Bundle Size**: ~109 KB gzipped

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Issue: Cart items not persisting
**Solution**: Check if localStorage is enabled in browser. Clear cache and cookies if necessary.

### Issue: Login token expired
**Solution**: Clear cookies or jwt_token from browser storage and log in again.

### Issue: Coupon code not applying
**Solution**: Ensure coupon code is entered exactly as shown (case-sensitive), and use valid codes: FIRST50, SAVE20, PROMO30, or FLAT500.

### Issue: Form validation errors
**Solution**: Verify all required fields meet the validation criteria:
- State must be exactly 2 uppercase letters
- Phone must be exactly 10 digits
- Pincode must be exactly 6 digits
- Email must follow valid format

### Issue: Order not appearing in My Orders
**Solution**: Return to home page and navigate back to My Orders, or refresh the page to reload from localStorage.

## Future Enhancements
- **Payment Gateway Integration**: Add Stripe/Razorpay for real transactions
- **Wishlist Feature**: Save favorite products for later
- **Product Search**: Full-text search across products
- **Advanced Filtering**: Filter by price range, rating, category
- **User Reviews & Ratings**: Customer product feedback
- **Email Notifications**: Order confirmation and status updates
- **Admin Dashboard**: Manage products, orders, and inventory
- **Inventory Management**: Track product stock levels
- **Shipping Integration**: Real-time shipping cost calculation
- **User Accounts**: Profile management and order history sync
- **Product Recommendations**: AI-powered suggestions
- **Dark Mode**: Theme toggle for better UX

## Performance Optimizations
- Vite's fast build and HMR for development
- Optimized production bundle (~109 KB gzipped)
- CSS is minified and critical styles extracted
- Images optimized for web
- localStorage caching for instant page loads
- No external CSS frameworks (custom optimized CSS)

## Security Considerations
- JWT tokens stored in httpOnly cookies (via js-cookie)
- Protected routes prevent unauthorized access
- Form validation prevents invalid data submission
- localStorage is client-side only (use server for sensitive data in production)
- Never store sensitive info (passwords, card details) in localStorage

## Code Quality Standards
- ESLint configuration for consistent code style
- React functional components with hooks
- Single Responsibility Principle for components
- Props destructuring for clarity
- Meaningful variable and function names
- Comments for complex logic

## Contributing
Feel free to submit issues and pull requests to improve the application. 

### Before Submitting
1. Ensure code passes ESLint checks: `npm run lint`
2. Test all features work correctly
3. Verify responsive design on mobile/tablet
4. Update README if adding new features

## Development Tips
- Use React DevTools browser extension for debugging
- Check Network tab to verify localStorage calls
- Use browser console for error messages
- Test on multiple browsers for compatibility
- Use Vite's dev server HMR for fast development

## License
This project is private and developed for educational/portfolio purposes. Not licensed for public commercial use.

## Support
For issues, bugs, or feature requests, please create an issue in the repository.

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Active Development