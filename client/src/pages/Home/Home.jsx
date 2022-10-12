import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/Auth')
  }

  return (
    <div className = 'home-container-1'>
        Home<br/>
    <button onClick={handleSubmit}>LogIn</button>
    </div>
  )
}

export default Home