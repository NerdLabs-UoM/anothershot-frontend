import { AlbumImage } from "@/app/lib/types";
import Masonry from "react-masonry-css";

interface MasonrygridProps {
    images: AlbumImage[];
}
export const Masonrygrid: React.FC<MasonrygridProps> = ({ images }) => {
    return (
        <div className="">
            <Masonry
                breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                }}
                className="flex gap-4"
                columnClassName=""
            >
                {images.map((img: AlbumImage, index: number) => (
                    <img
                        key={index}
                        src={img.image}
                        width="auto"
                        height="auto"
                        alt="image"
                        className="my-3 cursor-pointer rounded-3xl placeholder:blur hover:opacity-70"
                    />
                ))}
            </Masonry>
        </div>
    );
}