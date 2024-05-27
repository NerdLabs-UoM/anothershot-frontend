import { Profilereport, columns } from "./columns";
import { DataTable } from "./data-table";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import PaginationBar from "./pegination";
import { fetchLastPage, fetchReportData } from "../fetchReportData";

const TableData = () => {
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [fetch, setFetch] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<Profilereport[]>([]);
  const [name, setName] = useState<string>("");
  const [rolesString, setRolesString] = useState<string>(
    "ADMIN,PHOTOGRAPHER,CLIENT"
  );

  useEffect(() => {
    setPage(1);
  }, [fetch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data:Profilereport[] = await fetchReportData(page, name);
        setFilteredUsers(data);
      } catch (err) {
        toast.error("Error Fetching Data");
      }
    };
    fetchUsers();
  }, [page, fetch]);

  useEffect(() => {
    const fetchLast = async () => {
      try {
        const data = await fetchLastPage(name);
        setLast(data);
      } catch (err) {
        toast.error("Erro Fetching Data");
      }
    };
    fetchLast();
  }, [fetch]);

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
  const handleSearchValueChange = (value: string) => {
    if (!value) {
      setFetch(!fetch);
    }
    setName(value);
  };

  const handleClick = (currentPage: number) => {
    setPage(currentPage);
  };

  const handleSearch = () => {
    setFetch(!fetch);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns}
        onSearchClick={handleSearch}
        onSearchValueChange={handleSearchValueChange}
        data={filteredUsers} />
      <PaginationBar
        lastPage={last}
        currentPage={page}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleClick={handleClick}
      />
    </div>
  );
};

export default TableData;