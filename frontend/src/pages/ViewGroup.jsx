import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function ViewGroup() {
  const { groupId } = useParams();

  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${groupId}/summary`);
        setGroup(res.data);
      } 
        catch (err) {
  console.log("AXIOS ERROR FULL 👉", err);
  console.log("AXIOS RESPONSE 👉", err.response);
  console.log("AXIOS REQUEST 👉", err.request);
  setError("Failed to fetch group details");
}

         };

    fetchGroup();
  }, [groupId]);

  if (error) {
    return (
      <>
        <DashboardNavbar />
        <div className="container mt-4 text-danger">{error}</div>
      </>
    );
  }

  if (!group) {
    return (
      <>
        <DashboardNavbar />
        <div className="container mt-4">Loading group...</div>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="container mt-4">
        <h3>{group.groupName}</h3>
        <p>Total Expense: ₹{group.totalExpense}</p>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Paid</th>
              <th>Owed</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {group.members.map((m) => (
              <tr key={m.userId}>
                <td>{m.name}</td>
                <td>₹{m.paid}</td>
                <td>₹{m.owed}</td>
                <td>{m.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
