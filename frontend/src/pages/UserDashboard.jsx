import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function UserDashboard() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get(`/users/${user.id}/groups`);
        setGroups(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroups();
  }, [user.id]);

  return (
    <>
      <DashboardNavbar />

      <div className="container mt-4">
        <h3>Welcome, {user.name}</h3>

        <button
          className="btn btn-primary my-3"
          onClick={() => navigate("/creategroup")}
        >
          ➕ Create Group
        </button>

        <h4>Your Groups</h4>

        {groups.length === 0 && (
          <p className="text-muted">No groups created yet.</p>
        )}

        <div className="row">
          {groups.map((group) => (
            <div className="col-md-4" key={group.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{group.name}</h5>

                  <p className="card-text">
                    Members: {group.users.length}
                  </p>

                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() =>
                      navigate(`/addmember/${group.id}`)
                    }
                  >
                    Add Member
                  </button>

                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      navigate(`/viewgroup/${group.id}`)
                    }
                  >
                    View Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
