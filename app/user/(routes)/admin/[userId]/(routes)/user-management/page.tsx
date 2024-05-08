"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { fetchData, fetchLastPage } from "./serviceData";
import PaginationSection from "./components/pagination";
import { User } from "@/app/lib/types";
import { set } from "lodash";

interface UserRole {
  role: string;
  isChecked: boolean;
}

const userRoles: UserRole[] = [
  {
    role: "Admin",
    isChecked: false,
  },
  {
    role: "Photographer",
    isChecked: false,
  },
  {
    role: "Client",
    isChecked: false,
  },
];

const AdminPage = () => {
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [last, setLast] = useState(1);

  const [name, setName] = useState<string>("");
  const [fetch, setFetch] = useState<boolean>(false);

  const [userRole, setUserRole] = useState<UserRole[]>(userRoles);
  const [rolesString, setRolesString] = useState<string>("ADMIN,PHOTOGRAPHER,CLIENT");

  const makeStringRoles = (roles: UserRole[]) => {
    const newUserRole = roles.filter((role) => role.isChecked);

    return newUserRole.map((user) => user.role).join(",").toUpperCase();
  }
  useEffect(() => {
    setPage(1);
  }, [fetch]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data: User[] = await fetchData(page, name, rolesString);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, [page, fetch]);

  useEffect(() => {
    const fetchLast = async () => {
      const data = await fetchLastPage(name, rolesString);
      setLast(data);
    };
    fetchLast();
    // console.log("user roles tika", newUserRole)
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
    console.log("search clicked")

    setFetch(!fetch);
  }

  const onCheckInputChange = (newUserRole: UserRole[]) => {
    console.log("new user role", newUserRole);
    const rolesString = makeStringRoles(newUserRole);
    setUserRole(newUserRole);
    setRolesString(rolesString);
  };


  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        onSearchClick={handleSearch}
        onSearchValueChange={handleSearchValueChange}
        onCheckInputChange={onCheckInputChange}
        userRole={userRole}
        data={filteredUsers} />'

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
