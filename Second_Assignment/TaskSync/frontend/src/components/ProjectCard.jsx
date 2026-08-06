import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }) => {

  const navigate = useNavigate()

  const handleOpen = () => {
    navigate(`/project/${project.id}`, {
      state: { project }
    })
  }

  return (
    <div style={{ backgroundColor:'#222', border:'1px solid #444', borderRadius:'10px', padding:'20px' }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
        <h3 style={{ color:'white', margin:0 }}>{project.name}</h3>
        <span style={{ backgroundColor:'#3b82f6', color:'white', padding:'4px 10px', borderRadius:'20px', fontSize:'12px' }}>
          {project.role}
        </span>
      </div>

      <p style={{ color:'#aaa', marginBottom:'15px' }}>
        {project.description || 'No description'}
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom:'15px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
          <span style={{ color:'#aaa', fontSize:'13px' }}>Progress</span>
          <span style={{ color:'white', fontSize:'13px' }}>{project.progress || 0}%</span>
        </div>
        <div style={{ backgroundColor:'#444', borderRadius:'10px', height:'8px' }}>
          <div style={{ backgroundColor:'#3b82f6', borderRadius:'10px', height:'8px', width:`${project.progress || 0}%` }}></div>
        </div>
        <p style={{ color:'#aaa', fontSize:'12px', marginTop:'5px' }}>
          {project.done_tasks || 0} / {project.total_tasks || 0} tasks done
        </p>
      </div>

      <button
        onClick={handleOpen}
        style={{ width:'100%', padding:'10px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' }}
      >
        Open Board →
      </button>

    </div>
  )
}

export default ProjectCard