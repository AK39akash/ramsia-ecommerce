import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Banner from '../components/Banner'
import PromotionalBanner from '../components/PromotionalBanner'

const Home = () => {
    return (
        <div>
            <Hero/>
            <PromotionalBanner/>
            <LatestCollection/>
            <Banner/>
            <BestSeller/>
            <OurPolicy/>
            <NewsletterBox/>
        </div>
    )
}

export default Home
