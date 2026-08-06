import React from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'

const API_URL = 'http://localhost:3000/api'

const KanbanColumn = ({ title, tasks, onStatusChange, columnStatus }) => {

  const handleDragOver = (e) => {
    e.preventDefault()  // allows drop
  }

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData('taskId')

    axios.put(`${API_URL}/tasks/${taskId}`, { status:columnStatus }, { withCredentials:true })
      .then(() => onStatusChange())
      .catch((error) => console.error('Error moving task', error))
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ backgroundColor:'#222', border:'1px solid #444', borderRadius:'10px', padding:'20px', flex:1, minHeight:'400px' }}
    >
      <h3 style={{ color:'white', marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #444' }}>
        {title} ({tasks.length})
      </h3>

      {tasks.length === 0 ? (
        <p style={{ color:'#666', textAlign:'center' }}>No tasks here</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  )
}

export default KanbanColumn