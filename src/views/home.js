import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Cards from '../components/cards'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>NFL Favorite Four</title>
        <meta property="og:title" content="NFL Favorite Four" />
      </Helmet>
      <Navbar></Navbar>
      <Hero></Hero>
      <Cards></Cards>
      <Footer></Footer>
    </div>
  )
}

export default Home
