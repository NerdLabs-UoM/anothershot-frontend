import EditButton from "./components/editButton";
import ContactSectionContent from "./components/contactSectionContent";

const ContactSection = () => {
  return (
    
    <div className="flex flex-col items-end">
      <EditButton />
      <ContactSectionContent />
    </div>
  );
};

export default ContactSection