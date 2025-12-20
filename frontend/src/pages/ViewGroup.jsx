import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function ViewGroup() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${groupId}/summary`);
        setGroup(res.data);
      } 
        catch (err) {
  
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
        <h4 className="mt-4">Expenses</h4>

{group.expenses.length === 0 && (
  <p className="text-muted">No expenses added yet.</p>
)}

<ul className="list-group mb-4">
  {group.expenses.map((e) => (
    <li key={e.expenseId} className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{e.description}</strong>
          <br />
          <small className="text-muted">
            Paid by {e.paidBy} • {e.splitType}
          </small>
        </div>
        <span className="fw-bold">₹{e.amount}</span>
      </div>
    </li>
  ))}
</ul>

<h5 className="text-end">
  Total Expense: <strong>₹{group.totalExpense}</strong>
</h5>

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
      <div className="d-flex justify-content-center my-3">
      <button justify-content-center
  className="btn btn-success"
  onClick={() => navigate(`/addexpense/${groupId}`)}
>
  ➕ Add Expense
</button>
            </div>
    </>
  );
}
