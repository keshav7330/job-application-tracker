import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api/journal'

const moodEmoji = {
  MOTIVATED: '🔥',
  NEUTRAL: '😐',
  ANXIOUS: '😰',
  DISCOURAGED: '😞',
  HOPEFUL: '🌱'
}

export default function Journal() {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ mood: 'NEUTRAL', content: '', entryDate: '' })

  useEffect(() => { fetchEntries() }, [])

  const fetchEntries = () => axios.get(API).then(r => setEntries(r.data))

  const submit = () => {
    if (!form.content || !form.entryDate) return
    axios.post(API, form).then(() => { fetchEntries(); setForm({ mood: 'NEUTRAL', content: '', entryDate: '' }) })
  }

  const remove = (id) => axios.delete(`${API}/${id}`).then(fetchEntries)

  return (
    <div>
      <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <p style={{ marginBottom: '16px', fontWeight: '600' }}>how are you feeling?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select value={form.mood}
            onChange={e => setForm({ ...form, mood: e.target.value })}
            style={inputStyle}>
            {Object.keys(moodEmoji).map(m => (
              <option key={m} value={m}>{moodEmoji[m]} {m}</option>
            ))}
          </select>
          <input type="date" value={form.entryDate}
            onChange={e => setForm({ ...form, entryDate: e.target.value })}
            style={inputStyle} />
          <textarea placeholder="what's on your mind today..."
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            rows={4}
            style={{ ...inputStyle, resize: 'none' }} />
          <button onClick={submit} style={btnStyle}>save entry →</button>
        </div>
      </div>

      {entries.length === 0 && <p style={{ color: '#555', textAlign: 'center' }}>no entries yet. write something 📝</p>}
      {entries.map(entry => (
        <div key={entry.id} style={{ background: '#1a1a1a', borderRadius: '12px', padding: '16px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>{moodEmoji[entry.mood]}</span>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#555', fontSize: '13px' }}>{entry.entryDate}</span>
              <button onClick={() => remove(entry.id)} style={{ background: 'none', border: 'none', color: '#555', fontSize: '16px' }}>✕</button>
            </div>
          </div>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>{entry.content}</p>
        </div>
      ))}
    </div>
  )
}

const inputStyle = { background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '10px 14px', color: '#f0f0f0', fontSize: '14px', width: '100%' }
const btnStyle = { background: '#f0f0f0', color: '#0f0f0f', border: 'none', borderRadius: '8px', padding: '10px 14px', fontWeight: '600', fontSize: '14px' }