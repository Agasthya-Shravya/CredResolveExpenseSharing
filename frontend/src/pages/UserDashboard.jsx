import Navbar from "../components/DashBoardNavbar";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <p className="text-muted">
          Manage your groups, expenses and settlements here.
        </p>
      </div>
    </>
  );
}
