import React from 'react'
import HeroSection from '../Components/HeroSection'
import FeatureStrip from '../Components/FeatureStrip'
import AgriculturalStats from '../Components/AgriculturalStats'
import Whatwedo from '../Components/Whatwedo';
const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeatureStrip/>
      <AgriculturalStats />
      <Whatwedo/>
    </div>
  )
}

export default Home
