import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container-fluid h-70">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">

                    {/* Form Section */}
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSignup}>

                        <div className="mb-4">
                          <label className="form-label">Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Your Email</label>
                          <input
                            type="email"
                            className="form-control"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Repeat your password</label>
                          <input
                            type="password"
                            className="form-control"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100 mb-3"
                        >
                          Register
                        </button>

                        <p className="text-center">
                          Already have an account? <Link to="/login">Login</Link>
                        </p>

                      </form>
                    </div>

                    {/* Image Section */}
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Signup"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
