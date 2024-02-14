import React from 'react'
import {PackageCard} from './components/packageCard';
// import PackageList from './components/packageList';
import Heading from './components/heading';

const packagesSection = () => {
  return (
     <div>
    <Heading/>

    <div className='flex flex-col sm:flex-row flex-wrap justify-center'>
    

    <PackageCard
    src={"/images/groom-putting-ring-bride-s-finger 1.png"}
    alt="image1"
    width={260}
    height={173}
    title1='Weddings'
    title2='Events Package Details list'
    content1='1st level of puns: 5 gold c'
    content2='2nd level of jokes: 10 gold'
    content3='3rd level of one-liners : 20'/>

<PackageCard
    src={"/images/close-up-recording-video-with-smartphone-during-concert-toned-picture 1.png"}
    alt="image1"
    width={260}
    height={173}
    title1='Events'
    title2='Events Package Details list'
    content1='1st level of puns: 5 gold c'
    content2='2nd level of jokes: 10 gold'
    content3='3rd level of one-liners : 20'/>
    
    <PackageCard
    src={"/images/medium-shot-friends-posing-together-photobooth 1.png"}
    alt="image1"
    width={260}
    height={173}
    title1='Parties'
    title2='Events Package Details list'
    content1='1st level of puns: 5 gold c'
    content2='2nd level of jokes: 10 gold'
    content3='3rd level of one-liners : 20'/>

   


  
</div>
    {/* <PackageList/> */}
    </div>
  )
}

export default packagesSection