import React from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const TaskCard = ({ task, onStatusChange }) => {

  const handleChange = (e) => {
    const newStatus = e.target.value
    axios.put(`${API_URL}/tasks/${task.id}`, { status:newStatus }, { withCredentials:true })
      .then(() => onStatusChange())
      .catch((error) => console.error('Error updating task', error))
      
  }

  // drag start — store task id and current status
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id)
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      style={{ backgroundColor:'#333', border:'1px solid #555', borderRadius:'8px', padding:'15px', marginBottom:'10px', cursor:'grab' }}
    >
      <h4 style={{ color:'white', margin:'0 0 5px 0' }}>{task.title}</h4>
      <p style={{ color:'#aaa', fontSize:'14px', margin:'0 0 10px 0' }}>{task.description || ''}</p>

      <select
        value={task.status}
        onChange={handleChange}
        style={{ width:'100%', padding:'8px', backgroundColor:'#444', color:'white', border:'1px solid #555', borderRadius:'6px', cursor:'pointer' }}
      >
        <option value='todo'>To Do</option>
        <option value='in_progress'>In Progress</option>
        <option value='done'>Done</option>
      </select>
    </div>
  )
}

export default TaskCard