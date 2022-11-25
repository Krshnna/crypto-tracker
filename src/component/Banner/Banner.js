import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from '../Banner/Carousel'

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContainer'>
            <div className='tagLine'>
                <Typography variant='h2' style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat"
                }}>Cryto Tracker</Typography>
                <Typography variant='subtitle2'
                style={{
                    color:"darkgrey",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat"
                }}>
                    Get all the info regarding your favorite CrytoCurrency
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner