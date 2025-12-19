import { useEffect, useState } from "react";
import api from "../api/axios";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createGroup = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await api.post("/groups", { name });
      setName("");
      fetchGroups();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Groups</h3>

      {/* Create Group */}
      <form className="d-flex mb-3" onSubmit={createGroup}>
        <input
          className="form-control me-2"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary">Create</button>
      </form>

      {/* Group List */}
      <ul className="list-group">
        {groups.map((g) => (
          <li key={g.id} className="list-group-item">
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
