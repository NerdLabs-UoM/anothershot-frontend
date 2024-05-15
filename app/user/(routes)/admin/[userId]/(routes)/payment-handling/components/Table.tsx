import axios from "axios"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"


const TableData=()=> {

  const [paymentdata,setData] = useState<Payment[]>([])
  useEffect(() =>{
    const getData = async()=>{
      try{
        const { data } = await axios.get<Payment[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/get-all-payments`)
        const Data = await data
        setData(Data)
      }catch(err){
        toast.error("Error fetching data")
      }
    }
    getData()
  },[])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={paymentdata} />
    </div>
  )
}

export default TableData