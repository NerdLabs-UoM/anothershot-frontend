import React, { useEffect, useState } from 'react'
import { PackageCard } from './components/packageCard';
import { Package } from '@/app/lib/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PackageEditForm from './components/packageForm';

const packagesSection = () => {

  const [packageList, setPackageList] = useState<Package[]>([])
  const { userId } = useParams()

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/${userId}`)
      const data = response.data
      console.log(data)
      setPackageList(data)
    }
    fetchPackages()
  }, [])

  return (
    <div className="mt-0 sm:mt-4 mb-0 sm:mb-10 w-full sm:w-full sm:mr-2 border-y-0 sm:border-y-2 px-4 py-10 pb-0 sm:pb-16 justify-between bg-gray-200 sm:bg-white">
      <div className="flex flex-row  sm:flex sm:flex-row  sm:justify-between">
        <h1 className="flex text-4xl font-bold mb-0 ml-24 sm:ml-0">Packages</h1>
        <PackageEditForm packages={packageList} />
      </div>
      {packageList.map((packageItem) => (
        <PackageCard
          src={packageItem.coverPhotos[0]}
          name={packageItem.name}
          description={packageItem.description}
          price={packageItem.price}
          key={packageItem.id}
        />
      ))}
    </div>
  )
}

export default packagesSection