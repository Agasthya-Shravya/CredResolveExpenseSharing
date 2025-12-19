import { useEffect, useState } from "react";
import api from "../api/axios";

function Balances() {
  const [balances, setBalances] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const res = await api.get(`/balances/${userId}`);
      setBalances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Balances</h3>

      {balances.length === 0 && (
        <p className="text-muted">No balances to show</p>
      )}

      <ul className="list-group">
        {balances.map((b, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between ${
              b.amount < 0 ? "text-danger" : "text-success"
            }`}
          >
            <span>
              {b.amount < 0
                ? `You owe ${b.toUser}`
                : `${b.fromUser} owes you`}
            </span>
            <strong>₹ {Math.abs(b.amount)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Balances;
