import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AddMember() {
  const { groupId } = useParams();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAddMember = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/groups/${groupId}/add-user`, null, {
        params: { email },
      });

      alert("User added to group");
      navigate("/userdashboard");
    } catch (err) {
      alert("Failed to add user");
      console.error(err);
    }
  };

  return (
    <>
      <DashboardNavbar />

      <div className="container mt-4">
        <h3>Add Member</h3>

        <form onSubmit={handleAddMember}>
          <div className="mb-3">
            <label className="form-label">User Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </form>
      </div>
    </>
  );
}
