import React from 'react'
import EditButton from './editButton'

const heading = () => {
  return (
    <div className="flex sm:flex flex-row gap-20 md:gap-80 lg:gap-80 xl:gap-80 2xl:gap-80 justify-between sm:justify-between px-4 md:px-2 lg:px-6 xl:px-4  mt-10 md:mt-8 lg-mt-8 xl:mt-10">
    <h1 className="text-xl sm:text-4xl font-bold ml-2 md:ml-0 lg:ml-6 xl:ml-0">We Are Covering ...</h1>

    <div className="">
      <EditButton />
    </div>
  </div>
  )
}

export default heading