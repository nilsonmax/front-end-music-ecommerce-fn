import React from 'react'
import HomeContainer from '../../containers/home/homeContainer'
import NavBar from './../../components/Navbar/Navbar';

import { StyledHome } from './style';

const HomePage = () => {
  return (
    <StyledHome>
      <NavBar />
      <HomeContainer />
    </StyledHome>
  )
}

export default HomePage
