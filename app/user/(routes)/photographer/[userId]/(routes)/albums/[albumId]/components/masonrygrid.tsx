import Masonry from "react-masonry-css";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { AlbumImage } from "@/app/lib/types";

interface MasonrygridProps {
    images: AlbumImage[];
    albumName:string;
    canView:boolean;
}

export const Masonrygrid: React.FC<MasonrygridProps> = ({ images,albumName,canView }) => {

    const handleClick = async(img:AlbumImage) => {
        try {
            await axios.delete(
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
                        {canView && 
                        <AlertDialog>
                        <AlertDialogTrigger>
                            <Trash2 className="absolute z-10 text-white top-[50px] right-[30px]" size={25} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure to delete this image?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove from your Album <b>{albumName} </b>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleClick(img)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>}
                        
                        <img
                            src={img.image}
                            alt="image"
                            height="auto"
                            className="my-3 cursor-pointer rounded-3xl placeholder:blur hover:opacity-70"
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};
