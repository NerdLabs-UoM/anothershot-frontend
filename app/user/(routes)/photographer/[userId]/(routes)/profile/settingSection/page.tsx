

import React from "react";
import axios from "axios";
import Earnings from "./components/earnings";
import AddCategory from "./components/add_category";
import BankDetails from "./components/bank_details";
import Report from ".//report"

// const Settings = async() => {
//     try {
//         const users = await axios.get<paymentDetails[]>(
//             "http://localhost:8000/api/admin/getallusers"
//         );

//         const filteredUsers = users.data.map((user) => ({
//             name: user.clientsName,
//         }));
//         // return (
//         //     <div className="container py-10 mx-auto">
//         //         <DataTable columns={columns} data={filteredUsers} />
//         //     </div>
//         // );
//         console.log("user karayo tika: ",filteredUsers);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }

//     return (
//       <div className="items-center">
//         <div className="flex flex-wrap">
//           <Earnings/>
//           <div className="items-center"><AddCategory/></div>
//         </div>
//         <div><BankDetails /></div>
//       </div>
//     );
// };

const Settings = () => {
  return (
    <div className="items-center">
      <div className="flex flex-wrap">
        <Earnings/>
        <div className="items-center"><AddCategory/></div>
      </div>
      <div><BankDetails /></div>
      <Report />
    </div>
    
  );
}


export default Settings;