import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const UpdateProfile = () => {

  const navigate  = useNavigate()

  const [username, setUsername] = useState('')
  const [message, setMessage]   = useState('')
  const [error, setError]       = useState('')

  const handleUpdate = () => {

    if (!username) {
      setError('Username is required')
      return
    }

    axios.patch(`${API_URL}/auth/profile`, { username }, { withCredentials:true })
      .then((response) => {
        if (response.data.status === 'success') {
          setMessage('Profile updated successfully!')
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Something went wrong')
      })

  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#111' }}>
      <div style={{ backgroundColor:'#222', padding:'40px', borderRadius:'10px', width:'400px' }}>

        <h2 style={{ color:'white', marginBottom:'20px' }}>Update Profile</h2>

        <input
          type='text'
          placeholder='New Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />

        {error   && <p style={{ color:'red',   marginBottom:'15px' }}>{error}</p>}
        {message && <p style={{ color:'green', marginBottom:'15px' }}>{message}</p>}

        <button
          onClick={handleUpdate}
          style={{ width:'100%', padding:'12px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer', marginBottom:'15px' }}
        >
          Update Profile
        </button>

        <p
          onClick={() => navigate('/dashboard')}
          style={{ color:'#aaa', textAlign:'center', cursor:'pointer' }}
        >
          ← Back to Dashboard
        </p>

      </div>
    </div>
  )
}

export default UpdateProfile