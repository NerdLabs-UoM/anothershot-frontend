
import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[200px] text-md mt-4">
        <SelectValue placeholder="Select Package" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Weddings">Weddings</SelectItem>
          <SelectItem value="Events">Events</SelectItem>
          <SelectItem value="Concerts">Concerts</SelectItem>
          <SelectItem value="Parties">Parties</SelectItem>
          <SelectItem value="Wild Life">Wild Life</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}