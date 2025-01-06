"use client";
import EmployeeList from "@/components/EmployeeList";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";

const ListEmplyee = () => {
  const { user } = useUser();

  // Early return to handle loading state
  if (!user?.primaryEmailAddress?.emailAddress) {
    return <p>Loading...</p>;
  }

  // Use hooks unconditionally
  const getEmployees = useQuery(api?.employee?.getEmployee, {
    employer: user.primaryEmailAddress.emailAddress,
  });

  return getEmployees ? (
    <EmployeeList employees={getEmployees} />
  ) : (
    "Loading... "
  );
};

export default ListEmplyee;
