import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {

    // Private Router set if not logged in not direct to the Dashboard, Addtrain, Trainlist pages by RAJASEKAR //

    const auth = localStorage.getItem('login')

    return auth ? <Outlet /> : <Navigate to={'/login'} />

}

export default PrivateRouter;