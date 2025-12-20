import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AddExpense() {

  const { groupId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(user.id);
  const [splitType, setSplitType] = useState("EQUAL");
  const [splits, setSplits] = useState({});

  useEffect(() => {
    api.get(`/groups/${groupId}`).then(res => {
      setMembers(res.data.users);

      const initSplits = {};
      res.data.users.forEach(u => initSplits[u.id] = 0);
      setSplits(initSplits);
    });
  }, [groupId]);

  const handleSplitChange = (id, value) => {
    setSplits({ ...splits, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (splitType === "EXACT") {
      const total = Object.values(splits)
        .reduce((a, b) => a + Number(b), 0);

      if (total !== Number(amount)) {
        alert("Exact split must equal total amount");
        return;
      }
    }

    if (splitType === "PERCENTAGE") {
      const total = Object.values(splits)
        .reduce((a, b) => a + Number(b), 0);

      if (total !== 100) {
        alert("Percentage split must total 100%");
        return;
      }
    }

    const payload = {
      groupId: Number(groupId),
      paidBy: Number(paidBy),
      amount: Number(amount),
      description,
      splitType,
      splits: {}
    };

    members.forEach(m => {
      payload.splits[m.id] =
        splitType === "EQUAL" ? 0 : Number(splits[m.id]);
    });

    try {
      await api.post("/expenses", payload);
      navigate(`/viewgroup/${groupId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <>
      <DashboardNavbar />

      <div className="container mt-4">
        <h3>Add Expense</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />

          <select
            className="form-select mb-2"
            value={paidBy}
            onChange={e => setPaidBy(e.target.value)}
          >
            {members.map(m => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            className="form-select mb-2"
            value={splitType}
            onChange={e => setSplitType(e.target.value)}
          >
            <option value="EQUAL">Equal</option>
            <option value="EXACT">Exact</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>

          {splitType !== "EQUAL" &&
            members.map(m => (
              <input
                key={m.id}
                type="number"
                className="form-control mb-2"
                placeholder={m.name}
                onChange={e =>
                  handleSplitChange(m.id, e.target.value)
                }
                required
              />
            ))
          }

          <button className="btn btn-success">
            Add Expense
          </button>

        </form>
      </div>
    </>
  );
}
