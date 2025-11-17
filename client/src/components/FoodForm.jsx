import React, { useState } from 'react';

export default function FoodForm({ onSubmit, initial }){
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || '',
    quantity: initial?.quantity || 0,
    unit: initial?.unit || 'pcs',
    expiryDate: initial?.expiryDate ? initial.expiryDate.split('T')[0] : '',
    notes: initial?.notes || ''
  });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      expiryDate: form.expiryDate || undefined
    });
    if(!initial) setForm({ name:'', category:'', quantity:0, unit:'pcs', expiryDate:'', notes:'' });
  };

  return (
    <form onSubmit={submit}>
      <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input required placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
      <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} />
      <input placeholder="Unit" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} />
      <input type="date" value={form.expiryDate} onChange={e=>setForm({...form,expiryDate:e.target.value})} />
      <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
      <button type="submit">{initial ? 'Update' : 'Add'}</button>
    </form>
  );
}
