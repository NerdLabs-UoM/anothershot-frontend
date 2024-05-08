// "use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { FilterIcon, Search } from "lucide-react";
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface UserRole {
  role: string;
  isChecked: boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSearchClick:() => void;
  onSearchValueChange: (value: string) => void;
  userRole: UserRole[];
  onCheckInputChange: (newUserRole: UserRole[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSearchClick,
  onSearchValueChange,
  userRole,
  onCheckInputChange
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [newUserRole, setNewUserRole] = useState<UserRole[]>(userRole);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const onChangeCheckBox = (e: {
    target: { checked: boolean; value: React.SetStateAction<string>}}) => {
    // console.log("checkde",val);
    const { value, checked: isChecked } = e.target;
    setNewUserRole((prev) =>
      prev.map((item) => {
        if (item.role === value) item.isChecked = isChecked;
        return item;
      })
    );

    onCheckInputChange(newUserRole);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 ">
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="align-middle">
              <Button variant="outline" ><FilterIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-50 z-10 ml-10 border mt-8">
              <DropdownMenuLabel>User Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="ml-3">
                {userRole.map((item, index) => (
                  <div key={index}>
                    {/* <Checkbox
                    id={item.role}
                      value={item.role}
                      name="time"
                      onChange={onChangeCheckBox}
                      checked={item.isChecked}
                      className="peer m-2 w-4 h-4"
                    /> */}
                    <input
                        type="checkbox"
                        value={item.role}
                        name="time"
                        onChange={onChangeCheckBox}
                        id={item.role}
                        checked={item.isChecked}
                        className="peer m-2 w-4 h-4"
                      />
                    <label htmlFor={item.role}>
                      {item.role}

                    </label>
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Search by Name..."
            onChange={(event) =>
              onSearchValueChange(event.target.value)
            }
            className="max-w-sm w-full"
          />
          <Button>
          <Search className="mx-4 bg-gray-100 bg-transparent hover:cursor-pointor hover:bg-transparent" onClick={() => onSearchClick()}/>
          </Button>

        </div>
        
      </div>
      <div className="border rounded-md z-0">
        <Table>
          <TableHeader className="text-xs text-gray-500 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
