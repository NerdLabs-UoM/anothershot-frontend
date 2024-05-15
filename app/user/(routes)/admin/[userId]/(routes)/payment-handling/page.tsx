'use client'

import { Payment } from "@/app/lib/types";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const PaymentPage = () => {

  return (
    <>
      <Table />
    </>
  );
};

export default PaymentPage;
