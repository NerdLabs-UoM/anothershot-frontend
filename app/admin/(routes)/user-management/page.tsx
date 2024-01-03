"use server";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import axios from "axios";

interface User {
  id: string;
  userRole: string;
  name: string;
  email: string;
  status: string;
  
}

const AdminPage = async () => {
  try {
    const users = await axios.get<User[]>(
      "http://localhost:8000/api/admin/getallusers"
    );

    const filteredUsers = users.data.map((user) => ({
      id: user.id,
      userRole: user.userRole,
      name: user.name,
      email: user.email,
      status: user.status,
      
    }));
    return (
      <div className="container py-10 mx-auto">
        <DataTable columns={columns} data={filteredUsers} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default AdminPage;
