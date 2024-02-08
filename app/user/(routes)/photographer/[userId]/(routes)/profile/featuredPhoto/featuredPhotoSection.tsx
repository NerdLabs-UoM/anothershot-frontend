import EditButton from "./components/editButton";
import FeaturedPhoto from "./components/featuredPhoto";

const FeaturedPhotoSection = () => {
  return (
    <div className="flex flex-col items-end ">
      <EditButton />
      <FeaturedPhoto />
    </div>
  );
};

export default FeaturedPhotoSection;
