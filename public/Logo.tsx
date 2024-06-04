import React from 'react'
import { Hexagon } from 'lucide-react'
import {useRouter} from 'next/navigation' 

const Logo=()=> {
  const router = useRouter()
  return (
    <div onClick={()=>{
      router.push(`/`)
    }}>
      <div className="flex flex-row">
          <Hexagon className="fill-black w-8" />
          <div className = "font-bold">AnotherShot</div>
        </div>
    </div>
  )
}

export default Logo