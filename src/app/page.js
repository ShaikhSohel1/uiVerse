import Banner from '@/Components/Banner'
import Community from '@/Components/Community'
import Contributers from '@/Components/Contributers'
import Button from '@/Utility_Component/Button'
import ContributionCard from '@/Utility_Component/ContributionCard'
import Image from 'next/image'


export default function Home() {
  return (
    <div>
      <Banner />
      <Community />
      <Contributers />

     
    </div>
  )
}
