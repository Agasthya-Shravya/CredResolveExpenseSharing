import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function UserDashboard() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

const [balances, setBalances] = useState(null);

useEffect(() => {
  const fetchBalances = async () => {
    try {
      const res = await api.get(`/users/${user.id}/balances`);
      setBalances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchBalances();
}, [user.id]);

useEffect(() => {
  const fetchGroups = async () => {
    try {
      const res = await api.get(`/users/${user.id}/groups`);
      console.log("Groups API response:", res.data);
      console.log("Is Array:", Array.isArray(res.data));
      setGroups(Array.isArray(res.data) ? res.data : []);
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
                    Members: {group.memberCount}
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

      {/* Divider */}
<hr className="my-5" />

<h4 className="mb-4">💰 Your Balances</h4>

{balances && (
  <div className="row">

    {/* YOU OWE */}
    <div className="col-md-6">
      <div className="card border-danger mb-4">
        <div className="card-header bg-danger text-white">
          You Owe
        </div>

        <div className="card-body">
          {balances.youOwe.length === 0 ? (
            <p className="text-muted mb-0">You owe nothing 🎉</p>
          ) : (
            <ul className="list-group list-group-flush">
              {balances.youOwe.map((b, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{b.name}</span>
                  <strong className="text-danger">
                    ₹{b.amount}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div><br></br>

    {/* OWED TO YOU */}
    <div className="col-md-6">
      <div className="card border-success mb-4">
        <div className="card-header bg-success text-white">
          Owed To You
        </div>

        <div className="card-body">
          {balances.owedToYou.length === 0 ? (
            <p className="text-muted mb-0">No one owes you</p>
          ) : (
            <ul className="list-group list-group-flush">
              {balances.owedToYou.map((b, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{b.name}</span>
                  <strong className="text-success">
                    ₹{b.amount}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>

  </div>
)}

    </>
  );
}
