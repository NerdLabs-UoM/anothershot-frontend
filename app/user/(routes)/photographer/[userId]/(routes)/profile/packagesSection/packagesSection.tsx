"use client";
import React, { useEffect, useState } from "react";
import { PackageCard } from "./components/packageCard";
import { Package } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import PackageEditForm from "./components/packageEditForm";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const PackagesSection = () => {
  const [packageList, setPackageList] = useState<Package[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/${userId}`
        );
        const data = response.data;
        setPackageList(data);
      } catch (error) {
        toast.error("Cannot fetch packages. Please try again.");
      }
    };
    fetchPackages();
  }, [userId]);
  return (
    <div className="mt-0 sm:mt-4 mb-0 sm:mb-10 w-full sm:w-full sm:mr-2 py-10 pb-0 sm:pb-16 justify-between bg-white">
      <div className="flex flex-col justify-center text-center sm:flex sm:flex-row sm:justify-between">
        <h1 className="text-center text-2xl sm:text-5xl font-bold mb-0 sm:mb-6 sm:ml-5">
          Packages
        </h1>
        <PackageEditForm packages={packageList} packageProp={setPackageList} />
      </div>
      {packageList.length > 0 ? (
        <>
          <div className="flex flex-wrap">
            {packageList.map((packageItem) => (
              <PackageCard
                src={packageItem.coverPhotos[0]}
                name={packageItem.name}
                description={packageItem.description}
                price={packageItem.price}
                key={packageItem.id}
                packageId={packageItem.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-slate-950 mt-4">
          No Packages to display.
        </div>
      )}
    </div>
  );
};
export default PackagesSection;
