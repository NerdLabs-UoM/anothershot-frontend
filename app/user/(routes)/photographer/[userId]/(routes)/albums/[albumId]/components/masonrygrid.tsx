import { AlbumImage } from "@/app/lib/types";
import Masonry from "react-masonry-css";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface MasonrygridProps {
    images: AlbumImage[];
}
export const Masonrygrid: React.FC<MasonrygridProps> = ({ images }) => {
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };
    const handleClick = async(img:AlbumImage) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${img.id}/deleteimage`
            );
            toast.success("Image deleted successfully");
        }catch (e){
            toast.error("Error deleting image");
        }
        window.location.reload();
    };
    return (
        <div className="h-[100%] mb-[100px]">
            <Masonry
                breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                }}
                className="flex gap-4 "
            >
                {images.map((img: AlbumImage, index: number) => (
                    <div key={index} className="relative">
                        <Trash2 className="absolute z-10 text-white top-4 right-4" size={25} onClick={() => handleClick(img)}/>
                        <img
                            src={img.image}
                            alt="image"
                            height="auto"
                            className="my-3 cursor-pointer rounded-3xl placeholder:blur hover:opacity-70"
                            // layout="fill"
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};
