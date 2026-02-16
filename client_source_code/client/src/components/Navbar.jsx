import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } =
    useContext(AuthContext);
    

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-amber-300 px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        dsa sheet
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          <Link to="/profile">
            Welcome, {user.name}
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-300 px-4 py-1 rounded-full hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
