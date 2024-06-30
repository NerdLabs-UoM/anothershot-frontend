import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Download, MoreVertical } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlbumImage, Album } from "@/app/lib/types";
import { useEffect } from "react";
import fileDownload from "js-file-download";
import { NotificationService } from "@/components/notification/notification";

interface MasonrygridProps {
  images: AlbumImage[];
  albumData: Album | undefined;
  canView: boolean;
  isPhotographer: boolean;
  viewerId: string | undefined;

}

export const Masonrygrid: React.FC<MasonrygridProps> = ({
  images,
  canView,
  albumData,
  isPhotographer,
  viewerId,
}) => {
  const [status, setStatus] = useState<string>("");

  const handleClick = async (img: AlbumImage) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${img.id}/deleteimage`
      );
      toast.success("Image deleted successfully");
    } catch (e) {
      toast.error("Error deleting image");
    }
    window.location.reload();
  };

  const fetchPaymentStatus = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${viewerId}/${albumData?.id}/getStatus`
      );
      setStatus(res.data.status);
    } catch (error) {
      toast.error("Error fetching payment status");
    }
  };

  const handleCoverImage = (img: string, albumId: string) => {
    const updateCoverImage = async () => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/updatecoverImage`,
          {
            albumId: albumId,
            coverImage: img,
          }
        );
        toast.success("Cover image updated successfully");
      } catch (e) {
        toast.error("Error updating cover image");
      }
    };
    updateCoverImage();
  };

  const handleDownload = (url: string, filename: string) => {
    fetchPaymentStatus();
    try {
      if (isPhotographer || albumData?.price === 0 || status === "PAID") {
        axios
          .get(url, {
            responseType: "blob",
          })
          .then((res) => {
            fileDownload(res.data, filename);
          });
      } else {
        const parts = url.split("/upload/");

        const modifiedUrl = `${parts[0]}/upload/w_400,f_auto,q_auto/l_text:helvetica_50_bold:Anothershot,g_north,y_100,o_50/${parts[1]}`;
        axios
          .get(modifiedUrl, {
            responseType: "blob",
          })
          .then((res) => {
            fileDownload(res.data, filename);
          });
      }
      toast.success("Image downloaded successfully");
      NotificationService({
        senderId: viewerId,
        receiverId: `${albumData?.photographerId}`,
        type: "image",
        title: "downloaded an image",
        description: `Image downloaded from album ${albumData?.name} successfully`,
      });
    } catch (e) {
      toast.error("Error downloading image");
    }
  };

  return (
    <div className="h-[100%] mb-[100px]">
      <Masonry
        breakpointCols={{
          default: 6,
          1024: 4,
          768: 3,
          640: 2,
        }}
        className="flex gap-4 transition-transform  85ms ease-out"
      >
        {images.map((img: AlbumImage, index: number) => (
          <div key={index} className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreVertical
                  size={24}
                  color="#000000"
                  strokeWidth={2.5}
                  className="cursor-pointer absolute top-0 right-0 mr-2 mt-2 z-10 hover:bg-gray-300 rounded-full "
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  {canView && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger className="relative hover:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pr-28">
                          <span className="cursor-pointer h-4">Delete</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to delete this Album ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove from your Albums.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleClick(img)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DropdownMenuItem>
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            handleCoverImage(img.image, img.albumId)
                          }
                        >
                          Set as Cover
                        </span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <button
                      onClick={() => {
                        handleDownload(img.image, `${img.id}.jpg`);
                      }}
                    >
                      Download
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <img
              src={img.image}
              alt="image"
              height="auto"
              className="my-3 rounded-3xl placeholder:blur hover:opacity-70 hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};
