import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ViewGroup() {
  const { groupId } = useParams();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/groups/${groupId}/summary`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch group details");
        }
        return res.json();
      })
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [groupId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-4 text-danger">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Group Header */}
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">{group.groupName}</h3>
            <h5 className="text-muted">
              Total Expense: ₹{group.totalExpense}
            </h5>
          </div>
        </div>

        {/* Members Table */}
        <div className="card">
          <div className="card-body">
            <h4 className="mb-3">Members Summary</h4>

            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Paid</th>
                  <th>Owed</th>
                  <th>Net Balance</th>
                </tr>
              </thead>
              <tbody>
                {group.members.map((member) => (
                  <tr key={member.userId}>
                    <td>{member.name}</td>
                    <td>₹{member.paid}</td>
                    <td>₹{member.owed}</td>
                    <td
                      className={
                        member.net >= 0
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {member.net >= 0
                        ? `+₹${member.net}`
                        : `-₹${Math.abs(member.net)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </>
  );
}
