import React from 'react'
import { Hexagon } from 'lucide-react'

const Logo=()=> {
  return (
    <div>
      <div className="flex flex-row">
          <Hexagon className="fill-black w-8" />
          <div className = "font-bold">AnotherShot</div>
        </div>
    </div>
  )
}

export default Logo