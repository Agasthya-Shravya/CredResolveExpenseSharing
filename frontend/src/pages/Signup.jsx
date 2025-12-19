import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Navbar />

      <div className="page">
        <div className="page-form">
          <h3 className="mb-4">Sign Up</h3>

          <input className="form-control mb-3" placeholder="Name" />
          <input className="form-control mb-3" placeholder="Email" />
          <input type="password" className="form-control mb-3" placeholder="Password" />
          <input type="password" className="form-control mb-3" placeholder="Confirm Password" />

          <button className="btn btn-primary w-100 mb-3">
            Register
          </button>

          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="page-image">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Signup"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>
    </>
  );
}
