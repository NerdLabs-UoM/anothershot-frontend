import EditButton from "./components/editButton";
import ContactSectionContent from "./components/contactSectionContent";

const ContactSection = () => {
  return (
    <div className="flex flex-col items-end">
      {/* <EditButton /> */}
      <ContactSectionContent
        phone1="+94778204942"
        phone2="+94712428170"
        email="sample@gmail.com"
        addressL1="AddressLine1"
        addressL2="AddressLine2"
        addressL3="AddressLine3"
      />
    </div>
  );
};

export default ContactSection;
