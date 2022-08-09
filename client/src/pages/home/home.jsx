import React from 'react'
import HomeContainer from '../../containers/home/homeContainer'

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
