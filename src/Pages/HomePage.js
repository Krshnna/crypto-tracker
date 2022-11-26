import React, { Fragment } from 'react'
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinTable';
const HomePage = () => {
  return (
    <Fragment>
      <Banner/>
      <CoinsTable/>
    </Fragment>
  )
}

export default HomePage;