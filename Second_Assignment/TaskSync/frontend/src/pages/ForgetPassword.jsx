import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const ForgotPassword = () => {

  const navigate = useNavigate()

  const [email, setEmail]           = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage]       = useState('')
  const [error, setError]           = useState('')

  const handleReset = () => {

    if (!email || !newPassword) {
      setError('All fields are required')
      return
    }

    axios.patch(`${API_URL}/auth/forgot-password`, { email, newPassword })
      .then((response) => {
        if (response.data.status === 'success') {
          setMessage('Password reset successfully!')
          setTimeout(() => navigate('/'), 2000)
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Something went wrong')
      })

  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#111' }}>
      <div style={{ backgroundColor:'#222', padding:'40px', borderRadius:'10px', width:'400px' }}>

        <h2 style={{ color:'white', marginBottom:'20px' }}>Reset Password</h2>

        <input
          type='email'
          placeholder='Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />

        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />

        {error   && <p style={{ color:'red',   marginBottom:'15px' }}>{error}</p>}
        {message && <p style={{ color:'green', marginBottom:'15px' }}>{message}</p>}

        <button
          onClick={handleReset}
          style={{ width:'100%', padding:'12px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer', marginBottom:'15px' }}
        >
          Reset Password
        </button>

        <p
          onClick={() => navigate('/')}
          style={{ color:'#aaa', textAlign:'center', cursor:'pointer' }}
        >
          ← Back to Login
        </p>

      </div>
    </div>
  )
}
export default ForgotPassword