import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Flag } from 'lucide-react';
import ReportFrom from './ReportFrom';

function ReportProfile() {
  return (
    <div>
        <Dialog>
        <DialogTrigger >
          <Flag className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Profile</DialogTitle>
            <ReportFrom/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReportProfile