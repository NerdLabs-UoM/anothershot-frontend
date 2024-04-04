"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    handlePrev: () => void;
    handleNext: () => void;
    handleClick: (currentPage: number) => void;
    lastPage: number;
    currentPage: number;
}

const PaginationSection: React.FC<PaginationProps> = ({
    currentPage,
    lastPage,
    handlePrev,
    handleNext,
    handleClick,
}) => {
    return (
        <>
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={handlePrev}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                    <PaginationItem className="inline-flex">
                        {Array.from(
                            { length: Math.min(2, lastPage - currentPage) },
                            (_, index) => (
                                <PaginationLink
                                    key={index}
                                    isActive={
                                        currentPage === currentPage + index
                                    }
                                    onClick={() =>
                                        handleClick(currentPage + index)
                                    }
                                >
                                    {currentPage + index}
                                </PaginationLink>
                            )
                        )}
                    </PaginationItem>
                    {currentPage !== lastPage && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink
                            isActive={lastPage === currentPage}
                            onClick={() => handleClick(lastPage)}
                        >
                            {lastPage}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={handleNext}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default PaginationSection;
