import {Link} from 'react-router-dom'
import logo from '../../assets/cheemsstore logo.png';
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <div className="logo-container">
        <img
          className="website-logo"
          src={logo}
          alt="website logo"
        />
        <span className="website-name">Cheems Store</span>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-desktop-btn">
        Logout
      </button>
      <button type="button" className="logout-mobile-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="logout icon"
          className="logout-icon"
        />
      </button>
    </div>
  </nav>
)
export default Header
