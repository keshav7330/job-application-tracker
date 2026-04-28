import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api/applications'

const statusColors = {
  PENDING: '#f59e0b',
  REJECTED: '#ef4444',
  GHOSTED: '#6b7280',
  ACCEPTED: '#22c55e'
}

export default function Applications() {
  const [apps, setApps] = useState([])
  const [form, setForm] = useState({ companyName: '', role: '', dateApplied: '', status: 'PENDING' })

  useEffect(() => { fetchApps() }, [])

  const fetchApps = () => axios.get(API).then(r => setApps(r.data))

  const submit = () => {
    if (!form.companyName || !form.role || !form.dateApplied) return
    axios.post(API, form).then(() => { fetchApps(); setForm({ companyName: '', role: '', dateApplied: '', status: 'PENDING' }) })
  }

  const remove = (id) => axios.delete(`${API}/${id}`).then(fetchApps)

  return (
    <div>
      {/* Add Form */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ marginBottom: '16px', fontWeight: '600' }}>add application</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input placeholder="company name" value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
            style={inputStyle} />
          <input placeholder="role" value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={inputStyle} />
          <input type="date" value={form.dateApplied}
            onChange={e => setForm({ ...form, dateApplied: e.target.value })}
            style={inputStyle} />
          <select value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            style={inputStyle}>
            <option>PENDING</option>
            <option>REJECTED</option>
            <option>GHOSTED</option>
            <option>ACCEPTED</option>
          </select>
          <button onClick={submit} style={btnStyle}>add →</button>
        </div>
      </div>

      {/* List */}
      {apps.length === 0 && <p style={{ color: '#555', textAlign: 'center' }}>no applications yet. start applying 🚀</p>}
      {apps.map(app => (
        <div key={app.id} style={{ background: '#1a1a1a', borderRadius: '12px', padding: '16px 20px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: '600' }}>{app.companyName}</p>
            <p style={{ color: '#888', fontSize: '14px' }}>{app.role} · {app.dateApplied}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ background: statusColors[app.status] + '22', color: statusColors[app.status], padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
              {app.status}
            </span>
            <button onClick={() => remove(app.id)} style={{ background: 'none', border: 'none', color: '#555', fontSize: '16px' }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const inputStyle = { background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '10px 14px', color: '#f0f0f0', fontSize: '14px', width: '100%' }
const btnStyle = { background: '#f0f0f0', color: '#0f0f0f', border: 'none', borderRadius: '8px', padding: '10px 14px', fontWeight: '600', fontSize: '14px' }