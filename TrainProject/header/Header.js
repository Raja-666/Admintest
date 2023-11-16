import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='my-5 text-center'>
            <button onClick={() => navigate('/register')} type='button' className="btn btn-primary">Register</button>
            <button onClick={() => navigate('/login')} type='button' className="btn btn-primary ms-4">Login</button>
        </div>
    )
}

export default Header