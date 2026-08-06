import React from 'react'
import KanbanColumn from './KanbanColumn'

const KanbanBoard = ({ tasks, onStatusChange }) => {

  const todoTasks       = tasks.filter((task) => task.status === 'todo')
  const inProgressTasks = tasks.filter((task) => task.status === 'in_progress')
  const doneTasks       = tasks.filter((task) => task.status === 'done')

  return (
    <div style={{ display:'flex', gap:'20px' }}>

      <KanbanColumn
        title='📋 To Do'
        tasks={todoTasks}
        onStatusChange={onStatusChange}
        columnStatus='todo'
      />

      <KanbanColumn
        title='⚙️ In Progress'
        tasks={inProgressTasks}
        onStatusChange={onStatusChange}
        columnStatus='in_progress'
      />

      <KanbanColumn
        title='✅ Done'
        tasks={doneTasks}
        onStatusChange={onStatusChange}
        columnStatus='done'
      />

    </div>
  )
}

export default KanbanBoard