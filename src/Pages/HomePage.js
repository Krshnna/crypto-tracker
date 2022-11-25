import React, { Fragment } from 'react'
import Banner from '../component/Banner/Banner'
import CoinsTable from "../component/CoinsTable"
const HomePage = () => {
  return (
    <Fragment>
      <Banner/>
      <CoinsTable/>
    </Fragment>
  )
}

export default HomePage;