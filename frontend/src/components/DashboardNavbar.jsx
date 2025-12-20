import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid px-0">
        <Link className="navbar-brand fw-bold ms-3" to="/userdashboard">
          paypalzzz
        </Link>

        
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dashboardNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className="collapse navbar-collapse" id="dashboardNavbar">
          <ul className="navbar-nav me-auto ms-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/userdashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/groups">
                Groups
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/expenses">
                Expenses
              </Link>
            </li>
          </ul>

         
          {user && (
        <div className="d-flex align-items-center text-white">
          <div className="me-3 text-end">
            <small className="text-muted">{user.email}</small>
          </div>

          <button
            className="btn btn-outline-danger btn-sm me-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
      )}
      </div>
      </div>
    </nav>
  );
}
