import CarouselMessages from "./components/CarouselMessages";
import EditButton from "./components/EditButton";
import SubmitForm from "./components/SubmitForm";

const TestMonialsSection = () => {
    return (
        <div className="flex flex-col items-center">
            <EditButton />
            <CarouselMessages />
            <SubmitForm />
        </div>
    );
}

export default TestMonialsSection;