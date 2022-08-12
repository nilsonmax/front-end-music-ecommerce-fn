import React from 'react'
import Instruments from '../../components/Admin/Instruments/Instruments'
import Users from '../../components/Admin/Users/Users'
import NavBarLogin from '../../components/NavBarLogin/NavbarLogin'

const Panel = () => {
  return (
    <>
        <NavBarLogin />
        <Users />
        <Instruments />
    </>
  )
}

export default Panel