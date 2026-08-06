import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_URL = 'http://localhost:3000/api'
const Navbar = ({ showBack }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios.post(`${API_URL}/auth/logout`, {}, { withCredentials:true })
      .then(() => navigate('/'))
      .catch((error) => console.error('Logout failed', error))
  }
  return (
    <nav style={{ backgroundColor:'#222', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #444' }}>
      <h1 style={{ color:'#3b82f6', margin:0 }}>TaskSync</h1>
      <div style={{ display:'flex', gap:'10px' }}>
        {showBack && (
          <button
            onClick={() => navigate('/dashboard')}
            style={{ padding:'8px 16px', backgroundColor:'#444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' }}
          >
            ← Back
          </button>
        )}
        <button
          onClick={handleLogout}
          style={{ padding:'8px 16px', backgroundColor:'#dc2626', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default Navbar