import React, { useState } from 'react'
import { createProject } from '../services/projectApi'
import axios from 'axios'
const API_URL = 'http://localhost:3000/api'
const CreateProjectModal = ({ onClose, onCreated }) => {
  const [name, setName]               = useState('')
  const [description, setDescription] = useState('')
  const [error, setError]             = useState('')
  const handleCreate = () => {
    if (!name) {
      setError('Project name is required')
      return
    }
    axios.post(`${API_URL}/projects`, { name, description }, { withCredentials:true })
      .then((response) => {
        if (response.data.status === 'success') {
          onCreated()
          onClose()
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Something went wrong')
      })
  }
  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.6)', display:'flex', justifyContent:'center', alignItems:'center' }}>
      <div style={{ backgroundColor:'#222', padding:'40px', borderRadius:'10px', width:'400px' }}>
        <h3 style={{ color:'white', marginBottom:'20px' }}>Create New Project</h3>
        <input
          type='text'
          placeholder='Project Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />
        <input
          type='text'
          placeholder='Description (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />
        {error && <p style={{ color:'red', marginBottom:'15px' }}>{error}</p>}
        <div style={{ display:'flex', gap:'10px' }}>
          <button
            onClick={handleCreate}
            style={{ flex:1, padding:'12px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' }}
          >
            Create
          </button>
          <button
            onClick={onClose}
            style={{ flex:1, padding:'12px', backgroundColor:'#444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' }}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}
export default CreateProjectModal