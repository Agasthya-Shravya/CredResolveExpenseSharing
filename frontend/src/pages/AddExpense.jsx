import { useEffect, useState } from "react";
import api from "../api/axios";


function AddExpense() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");

  const [splits, setSplits] = useState({});

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    const res = await api.get("/groups");
    setGroups(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleSplitChange = (userId, value) => {
    setSplits({ ...splits, [userId]: value });
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    const payload = {
      groupId,
      amount,
      description,
      paidBy,
      splitType,
      splits
    };

    try {
      await api.post("/expenses", payload);
      alert("Expense added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Expense</h3>

      <form onSubmit={submitExpense}>
        {/* Group */}
        <select className="form-select mb-2" onChange={e => setGroupId(e.target.value)}>
          <option value="">Select Group</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        {/* Amount */}
        <input
          className="form-control mb-2"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        {/* Description */}
        <input
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Paid By */}
        <select className="form-select mb-2" onChange={e => setPaidBy(e.target.value)}>
          <option value="">Paid By</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        {/* Split Type */}
        <select className="form-select mb-3" onChange={e => setSplitType(e.target.value)}>
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENTAGE">Percentage</option>
        </select>

        {/* Split Inputs */}
        {splitType !== "EQUAL" &&
          users.map(u => (
            <input
              key={u.id}
              className="form-control mb-2"
              placeholder={`${u.name} ${splitType === "EXACT" ? "Amount" : "Percentage"}`}
              onChange={e => handleSplitChange(u.id, e.target.value)}
            />
          ))
        }

        <button className="btn btn-success">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
