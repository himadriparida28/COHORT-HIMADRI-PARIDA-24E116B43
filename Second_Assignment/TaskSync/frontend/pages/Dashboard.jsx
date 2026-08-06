import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'
const dummyProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign the company website',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'Build a mobile app for clients',
    role: 'member'
  },
  {
    id: 3,
    name: 'TaskSync Backend',
    description: 'Build the backend API',
    role: 'admin'
  }
]
const Dashboard = () => {
  const [projects, setProjects]   = useState(dummyProjects)
  const [showModal, setShowModal] = useState(false)
  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject])
  }
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-10 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold'>My Projects</h2>
          <button
            onClick={() => setShowModal(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition'
          >
            + New Project
          </button>
        </div>
        {projects.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-gray-400 text-lg'>No projects yet. Create one!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

      </div>
      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={handleProjectCreated}
        />
      )}
    </div>
  )
}
export default Dashboard