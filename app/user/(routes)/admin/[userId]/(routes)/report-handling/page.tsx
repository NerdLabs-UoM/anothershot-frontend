"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Table from "./components/Table";
import ImageReportTable from "./imageReports/ImageReportTable";

const ReportHandlingPage = () => {
  return (
    
      <Tabs defaultValue="account" className="flex flex-col justify-center w-11/12">
        <TabsList  className= "w-1/5 ml-8">
          <TabsTrigger value="account">Profile Reports</TabsTrigger>
          <TabsTrigger value="password">Image Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="">
         <Table />
        </TabsContent>
        <TabsContent value="password"><ImageReportTable/></TabsContent>
      </Tabs>
      
  );
};

export default ReportHandlingPage;
