import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/groups", {
        name: name,
        userIds: [user.id],
      });

      alert("Group created successfully");
      navigate("/userdashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create group");
    }
  };

  return (
    <>
      <DashboardNavbar />

      <div className="container mt-4">
        <h3>Create Group</h3>

        <form onSubmit={handleCreateGroup}>
          <div className="mb-3">
            <label className="form-label">Group Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Group
          </button>
        </form>
      </div>
    </>
  );
}
