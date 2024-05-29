"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Table from "./components/Table";
import ImageReportTable from "./imageReports/ImageReportTable";

const ReportHandlingPage = () => {
  return (
    
      <Tabs defaultValue="profile" className="flex flex-col justify-center w-11/12">
        <TabsList  className= "flex justify-center w-[260px] mt-1 ml-8">
          <TabsTrigger value="profile">Profile Reports</TabsTrigger>
          <TabsTrigger value="image">Image Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="">
         <Table />
        </TabsContent>
        <TabsContent value="image"><ImageReportTable/></TabsContent>
      </Tabs>

  );
};

export default ReportHandlingPage;
