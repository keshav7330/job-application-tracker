import { useState } from 'react'
import Applications from './components/Applications'
import Journal from './components/Journal'
import './index.css'

export default function App() {
  const [tab, setTab] = useState('applications')

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px', width: '100%' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
        job tracker 👾
      </h1>
      <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>
        track applications. process rejections. keep going.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['applications', 'journal'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: 'none',
            background: tab === t ? '#f0f0f0' : '#1e1e1e',
            color: tab === t ? '#0f0f0f' : '#888',
            fontWeight: tab === t ? '600' : '400',
            fontSize: '14px'
          }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'applications' ? <Applications /> : <Journal />}
    </div>
  )
}