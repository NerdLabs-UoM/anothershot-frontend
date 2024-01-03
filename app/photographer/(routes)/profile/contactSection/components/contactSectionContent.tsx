import React from "react";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Youtube } from "lucide-react";
import EditButton from "../../featuredPhoto/components/editButton";

const ContactSectionContent = () => {
  return (
    <div className="">
      <h1 className="flex flex-left text-3xl mb-3 font-bold"> Contact </h1>
      <div className=" flex flex-row gap-80 ">
        <div className="">
          <h4>+94 711305808</h4>
          <h4>+94 711305808</h4>
          <h4>sample.shop@gmail.com</h4>
        </div>

        <div className="grid grid-rows-3 mx-auto align-items-center">
          <h4>AddressLine1</h4>
          <h4>AddressLine1</h4>
          <h4>AddressLine1</h4>
        </div>

        <div className="flex grid-rows-6  justify-right  justify-berween-6 mt-4  mr-2 w-100">
          <div className="w-20 h-10">
            <Instagram />
          </div>
          <div className="w-20 h-10">
            <Facebook />
          </div>
          <div>
            {" "}
            <Youtube />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ContactSectionContent;
