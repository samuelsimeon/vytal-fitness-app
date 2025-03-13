import { Link, useLocation } from "react-router-dom";

function Header({ user, onLogout }) {
  const location = useLocation(); 

  // Check if the current route is NOT the homepage
  const isLandingPage = location.pathname === "/";

  return (
    <header className={`header ${isLandingPage ? "transparent-header" : "black-header"}`}>
      <div className="header-container container">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/vytallogoorange.png" alt="Brand Logo" className="logo" />
          </Link>
          <h1 className="app-name">Vytal</h1>
        </div>

        <nav>
          <ul className="nav-links">
            {user ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/workoutdictionary">Dictionary</Link></li>
                <li><Link to="/logworkouts">Log Workout</Link></li>
                <li><Link to="/logmeals">Log Meal</Link></li>
                <li><Link to="/streaks">Streak</Link></li>
                <li>
                  <button onClick={onLogout} className="logout-btn">Logout</button>
                </li>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
                <span className="divider"></span>
                <Link to="/register" className="register-btn">Get Started</Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
