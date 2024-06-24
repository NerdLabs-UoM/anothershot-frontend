import { columns } from "./columns";
import { DataTable } from "./data-table";
import Pagination from "@/components/pagination";
import { useEffect, useState } from "react";
import {
  fetchSystemReportData,
  fetchLastSystemReportPage,
} from "../fetchReportData";
import { SystemReport, User } from "@/app/lib/types";
import toast from "react-hot-toast";

const TableData = () => {
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [filteredReports, setFilteredReports] = useState<SystemReport[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data: SystemReport[] = await fetchSystemReportData(page);
        console.log("fetched data", data);
        setFilteredReports(data);
      } catch (err) {
        toast.error("Error Fetching Data");
      }
    };
    fetchReports();
  }, [page]);

  useEffect(() => {
    const fetchLast = async () => {
      try {
        const data = await fetchLastSystemReportPage();
        setLast(data);
      } catch (err) {
        toast.error("Erro Fetching Last page");
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

  const handleClick = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={filteredReports} />
      <Pagination
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
