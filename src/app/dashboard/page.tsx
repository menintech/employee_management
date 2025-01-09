"use client";

import { ThemeToggler } from "@/components/ThemeToggler";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { EmployeePresentChart } from "../charts/EmployeePresentChart";
import { CountAnalysis } from "../charts/CountAnalysis";
import AddItem from "@/components/AddItem";

const page = () => {
  const { user } = useUser();

  return (
    <>
      <ThemeToggler />
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        {/* <div>
          <Barchart />
        </div> */}
        <AddItem />
        <div>
          <EmployeePresentChart />
        </div>
        <div>
          <CountAnalysis />
        </div>
      </div>
    </>
  );
};

export default page;
