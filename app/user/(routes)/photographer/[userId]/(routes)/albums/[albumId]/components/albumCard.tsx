import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Card } from "@/components/ui/card";
import { Album } from "@/lib/types";
import Masonry from "react-masonry-css";


type AlbumCardProps = {
    albumData: Album[];
    isPhotographer: boolean;
    deleteAlbums: (id: string) => void;
};

const AlbumCard: React.FC<AlbumCardProps> = ({ albumData, isPhotographer, deleteAlbums }) => {

    if (!isPhotographer) {
        albumData = albumData.filter((album) => album.visibility === "PUBLIC");
    }

    return (
        <Masonry
            breakpointCols={{
                default: 4,
                1024: 3,
                768: 2,
                640: 1,
            }}
            className="flex gap-4"
        >
            {albumData.map(album => (
                <Card
                    key={album.id}
                    className="w-[300px] mb-9 mx-3 h-[400px] rounded-[40px] overflow-hidden relative "
                >
                    <Image
                        src={album.images[0]?.image || "/images/albumcover.png"}
                        alt="album cover"
                        layout="fill"
                        objectFit="cover"
                        className="hover:opacity-80 transition-opacity duration-300 ease-in-out"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent rounded-b-[40px] p-4 flex items-center justify-between">
                        <div className="flex flex-col justify-center">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {album.name}
                                        </h3>
                                        <p className="text-sm text-white">
                                            {album.description.slice(0, 30)}
                                        </p>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="h-auto w-60">
                                    <h6 className="text-xl font-semibold">
                                        {album.name}
                                    </h6>
                                    <p className="text-sm ">
                                        {album.description}
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="flex space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreVertical
                                        size={32}
                                        color="#ffffff"
                                        strokeWidth={2.5}
                                        className="cursor-pointer"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuGroup>
                                        {isPhotographer && (
                                            <>
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="relative hover:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pr-28">
                                                        <span className="cursor-pointer">Delete Album</span>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure to delete this Album ?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently remove from your Albums.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteAlbums(album.id ?? '')}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={{
                                                            pathname: `albums/${album.id}`,
                                                            query: {
                                                                view: true,
                                                            },
                                                        }}
                                                    >
                                                        Edit Album
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuItem>
                                            <Link
                                                href={{
                                                    pathname: `albums/${album.id}`,
                                                    query: {
                                                        view: false,
                                                    },
                                                }}
                                            >
                                                View Album
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </Card>
            ))}
        </Masonry>
    );
}

export default AlbumCard;