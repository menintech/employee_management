"use client";

import { ThemeToggler } from "@/components/ThemeToggler";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { Barchart } from "../charts/Barchart";
import { EmployeePresentChart } from "../charts/EmployeePresentChart";
import { CountAnalysis } from "../charts/CountAnalysis";
import AddItem from "@/components/AddItem";

const page = () => {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const checkAndCreateUser = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        upgrade: false,
        subscription_status: "",
        subscription_id: "",
        payment_id: "",
        subscription_start_date: "",
        subscription_end_date: "",
      });
    }
  };

  useEffect(() => {
    checkAndCreateUser();
  }, [user]);

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
