import Navbar from "../components/Navbar";

import "../styles/Home.css";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="page" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="page-form">
          <h1 className="fw-bold mb-3">
            Simplify Group Expense Sharing
          </h1>

          <p className="text-muted mb-4">
            CredResolve helps you manage group expenses, split bills fairly,
            and track who owes whom — all in one place.
          </p>

          <a href="/signup" className="btn btn-primary btn-lg me-3">
            Get Started
          </a>

          <a href="/login" className="btn btn-outline-secondary btn-lg">
            Login
          </a>
        </div>

        <div className="page-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Expense Sharing"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Why Use CredResolve?
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>Create Groups</h5>
                  <p>Create groups for trips, roommates, or events.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>Split Expenses</h5>
                  <p>Split expenses equally or unequally.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>Track Balances</h5>
                  <p>Always know who owes whom.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © {new Date().getFullYear()} PayPalzzz
      </footer>
    </>
  );
}
