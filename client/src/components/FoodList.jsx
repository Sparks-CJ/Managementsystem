import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodForm from './FoodForm';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function FoodList(){
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await axios.get(`${API}/food`);
    setItems(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const handleCreate = async (data) => {
    await axios.post(`${API}/food`, data);
    load();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/food/${id}`);
    load();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`${API}/food/${id}`, data);
    setEditing(null);
    load();
  };

  return (
    <div>
      <FoodForm onSubmit={handleCreate} />
      <hr />
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.category} — {item.quantity} {item.unit}
            <button onClick={()=>setEditing(item)}>Edit</button>
            <button onClick={()=>handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="modal">
          <h3>Edit</h3>
          <FoodForm initial={editing} onSubmit={(data)=>handleUpdate(editing._id, data)} />
          <button onClick={()=>setEditing(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
