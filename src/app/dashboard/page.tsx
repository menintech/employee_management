"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { EmployeePresentChart } from "../charts/EmployeePresentChart";
import { CountAnalysis } from "../charts/CountAnalysis";

const page = () => {
  const { user } = useUser();

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4">
      {/* <div>
          <Barchart />
        </div> */}
      <div>
        <EmployeePresentChart />
      </div>
      <div>
        <CountAnalysis />
      </div>
    </div>
  );
};

export default page;
