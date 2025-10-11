import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();

    // Listen for login/logout events
    const handleUserChange = () => loadUser();
    window.addEventListener("userChange", handleUserChange);

    return () => window.removeEventListener("userChange", handleUserChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    loadUser(); // update navbar immediately
    navigate("/login");
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-500 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          🏋️ Workout Tracker
        </Link>

        <div className="flex items-center space-x-2">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/workouts" className={linkClass("/workouts")}>
            Workouts
          </Link>

          {user ? (
            <>
              <span className="text-gray-300 px-3 py-2 rounded-md">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-2 rounded-md text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link to="/signup" className={linkClass("/signup")}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}






