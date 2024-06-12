import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Flag } from "lucide-react";
import ReportFrom from "./ReportFrom";

function ReportProfile() {
  const [isOpen, setIsOpen] = useState<{ isOpen: boolean }>({ isOpen: false });

  const handleOpenChange = (open: boolean) => {
    setIsOpen({ isOpen: open });
  };
  return (
    <div>
      <Dialog open={isOpen.isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Flag className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Report Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Profile</DialogTitle>
            <ReportFrom setIsOpen={setIsOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReportProfile;
