"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeList from "@/components/EmployeeList";
import { useUser } from "@clerk/nextjs";
import AddEmployeeComponent from "@/components/AddEmployeeComponent";

const Employee = () => {
  const { user } = useUser();

  return (
    <div>
      <Tabs defaultValue="add" className="w-full">
        <TabsList>
          <TabsTrigger value="add">Add Employee</TabsTrigger>
          <TabsTrigger value="list">Employee List</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddEmployeeComponent />
        </TabsContent>
        <TabsContent value="list">{user && <EmployeeList />}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Employee;
