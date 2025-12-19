import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Navbar />

      <div className="page">
        <div className="page-image">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Login"
            style={{ maxWidth: "80%" }}
          />
        </div>

        <div className="page-form">
          <h3 className="mb-4">Login</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input className="form-control form-control-lg" />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control form-control-lg" />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" defaultChecked /> Remember me
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Sign in
          </button>

          <p className="text-center">
            New user? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}
