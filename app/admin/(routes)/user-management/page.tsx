"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { fetchData, fetchLastPage } from "./serviceData";
import PaginationSection from "./components/pagination";

interface User {
  id: string;
  userRole: string;
  name: string;
  email: string;
  status: string;
}

const AdminPage = () => {
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [last, setLast] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchData(page);
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
    <div className="container py-10 ">
        <DataTable columns={columns} data={filteredUsers} />
      <div className="absolute top-[85%] inset-x-0">
        <PaginationSection
          lastPage={last}
          currentPage={page}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};
export default AdminPage;
