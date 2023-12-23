import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDetail from './UserDetail'
import User from './User'

function RouteCompo() {
  return (
    <>
            <Routes >
                <Route path='/' element={<User />} />
                <Route path='/user/:id' element={<UserDetail />}  />
            </Routes>
    </>
  )
}

export default RouteCompo
