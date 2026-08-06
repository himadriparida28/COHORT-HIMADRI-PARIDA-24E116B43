import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import KanbanBoard from '../components/KanbanBoard'
import CreateTaskModal from '../components/CreateTaskModal'

const API_URL = 'http://localhost:3000/api'

const ProjectBoard = () => {

  const location    = useLocation()
  const { project } = location.state

  const [tasks, setTasks]           = useState([])
  const [activities, setActivities] = useState([])
  const [showModal, setShowModal]   = useState(false)

  const loadTasks = () => {
    axios.get(`${API_URL}/projects/${project.id}/tasks`, { withCredentials:true })
      .then((response) => {
        if (response.data.status === 'success') {
          setTasks(response.data.tasks)
        }
      })
      .catch((error) => console.error('Error loading tasks', error))
  }

  const loadActivity = () => {
    axios.get(`${API_URL}/projects/${project.id}/activity`, { withCredentials:true })
      .then((response) => {
        if (response.data.status === 'success') {
          setActivities(response.data.activities)
        }
      })
      .catch((error) => console.error('Error loading activity', error))
  }

  const handleStatusChange = () => {
    loadTasks()
    loadActivity()
  }

  useEffect(() => {
    loadTasks()
    loadActivity()
  }, [])

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#111', color:'white' }}>
      <Navbar showBack={true} />

      <div style={{ padding:'30px' }}>

        {/* Board Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px' }}>
          <div>
            <h2 style={{ margin:'0 0 5px 0' }}>{project.name}</h2>
            <p style={{ color:'#aaa', margin:0 }}>{project.description || 'No description'}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ padding:'10px 20px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' }}
          >
            + New Task
          </button>
        </div>

        {/* Board + Activity Sidebar */}
        <div style={{ display:'flex', gap:'20px' }}>

          {/* Kanban Board */}
          <div style={{ flex:3 }}>
            <KanbanBoard
              tasks={tasks}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Activity Feed Sidebar */}
          <div style={{ flex:1, backgroundColor:'#222', border:'1px solid #444', borderRadius:'10px', padding:'20px' }}>
            <h3 style={{ color:'white', marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #444' }}>
              📋 Recent Activity
            </h3>

            {activities.length === 0 ? (
              <p style={{ color:'#666', textAlign:'center' }}>No activity yet</p>
            ) : (
              activities.map((activity, index) => (
                <div
                  key={index}
                  style={{ borderBottom:'1px solid #333', paddingBottom:'10px', marginBottom:'10px' }}
                >
                  <p style={{ color:'white', fontSize:'13px', margin:'0 0 3px 0' }}>{activity.action}</p>
                  <p style={{ color:'#aaa', fontSize:'11px', margin:0 }}>
                    by {activity.username}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {showModal && (
        <CreateTaskModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
          onCreated={() => { loadTasks(); loadActivity() }}
        />
      )}

    </div>
  )
}

export default ProjectBoard