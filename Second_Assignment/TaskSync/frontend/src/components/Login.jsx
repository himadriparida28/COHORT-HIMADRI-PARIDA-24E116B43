import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername]     = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const handleSubmit = () => {
    navigate('/dashboard')
  }
  return (
    <div className='min-h-screen bg-gray-900 flex justify-center items-center'>
      <div className='bg-gray-800 border border-gray-700 rounded-xl p-10 w-full max-w-md'>
        <h1 className='text-4xl font-extrabold text-blue-500 text-center mb-2'>
          TaskSync
        </h1>
        <p className='text-gray-400 text-center mb-8'>
          Collaborative Workspace
        </p>
        <h2 className='text-2xl font-bold text-white mb-6'>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        {isRegister && (
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-3 bg-gray-700 rounded-lg text-white outline-none mb-4'
          />
        )}

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-3 bg-gray-700 rounded-lg text-white outline-none mb-4'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 bg-gray-700 rounded-lg text-white outline-none mb-4'
        />

        <button
          onClick={handleSubmit}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition mb-5'
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className='text-gray-400 text-center cursor-pointer hover:text-white transition'
        >
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </p>

      </div>
    </div>
  )
}
export default Login