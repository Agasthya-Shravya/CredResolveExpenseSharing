import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/userdashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-vh-100 d-flex align-items-center">
        <div className="container-fluid py-5">
          <div className="row align-items-center">

            {/* Image */}
            <div className="col-md-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Login"
              />
            </div>

            {/* Form */}
            <div className="col-md-6">
              <form onSubmit={handleLogin}>

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Sign in
                </button>

                <div className="text-center">
                  <p>
                    New user? <Link to="/signup">Signup</Link>
                  </p>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
