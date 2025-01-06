"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeList from "@/components/EmployeeList";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import AddEmployeeComponent from "@/components/AddEmployeeComponent";

const Employee = () => {
  const { user } = useUser();

  // Early return to handle loading state
  if (!user?.primaryEmailAddress?.emailAddress) {
    return <p>Loading...</p>;
  }

  // Use hooks unconditionally
  const getEmployees = useQuery(api?.employee?.getEmployee, {
    employer: user.primaryEmailAddress.emailAddress,
  });

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
        <TabsContent value="list">
          {getEmployees && <EmployeeList employees={getEmployees} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Employee;
