"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { fetchData, fetchLastPage } from "./serviceData";
import PaginationSection from "./components/pagination";
import { User } from "@/app/lib/types";

const AdminPage = () => {
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [last, setLast] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const data:User[] = await fetchData(page);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const fetchLast = async () => {
      const data = await fetchLastPage();
      setLast(data);
    };
    fetchLast();
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  const handleNext = () => {
    if (page < last) {
      setPage((prevState) => prevState + 1);
    }
  };

  const handleClick = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <div className="w-full">
        <DataTable columns={columns} data={filteredUsers} />
        <PaginationSection
          lastPage={last}
          currentPage={page}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleClick={handleClick}
        />
    </div>
  );
};
export default AdminPage;
