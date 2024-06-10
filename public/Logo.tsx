import React from 'react'
import {useRouter} from 'next/navigation' 
import Image from 'next/image'

const Logo=()=> {
  const router = useRouter()
  return (
    <div onClick={()=>{
      router.push(`/`)
    }}>
      <div className="flex flex-row gap-2 pt-2">
          <Image
          src='/icon.png'
          width={24}
          height={10}
          alt='logo'
          />
          <div className = "font-bold">AnotherShot</div>
        </div>
    </div>
  )
}

export default Logo