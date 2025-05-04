"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "@firebase/firestore";
import db from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Edit2Icon, MoveLeft, PhoneCallIcon, PiggyBank } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Barchart } from "@/app/charts/Barchart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HalfdayChart } from "@/app/charts/halfdayChart";
import { EditDetails } from "@/components/EditEmployee";
import { IconCancel, IconCashOff } from "@tabler/icons-react";
import { PayEmployeeButton } from "@/components/UpiPayment";
import SalarySlip from "@/components/SalarySlip";

const page = () => {
  const payslipData = {
    employeeName: "Vijay Kumar Maurya",
    siteName: "Forming Metal",
    department: "Production",
    idNo: "1009",
    srNo: "07",
    payableDays: 26,
    otHrs: 92,
    uanNo: "101750653782",
    esicNo: "3315213260",
    basic: 14010.0,
    da: 1054.0,
    hra: 753.0,
    conveyance: 0.0,
    otAmount: 6996.0,
    pf: 1808.0,
    esic: 171.0,
    pt: 200.0,
    deductions: 2179.0,
    totalGross: 22813.0,
    netInHand: 20634.0,
    monthYear: "December 2023",
  };

  const monthData: Record<number, string>[] = [
    { 1: "Jan" },
    { 2: "Feb" },
    { 3: "Mar" },
    { 4: "Apr" },
    { 5: "May" },
    { 6: "Jun" },
    { 7: "Jul" },
    { 8: "Aug" },
    { 9: "Sep" },
    { 10: "Oct" },
    { 11: "Nov" },
    { 12: "Dec" },
  ];

  // Salary calculation constants
  const FULL_DAY_SALARY = 1000;
  const HALF_DAY_SALARY = 500;

  const { empId } = useParams<any>();
  const router = useRouter();
  const currentYear: any = new Date().getFullYear();

  const [employee, setEmployee] = useState<any>();
  const [employeePerYear, setEmployeePerYear] = useState<any[]>();
  const [paymentSection, showPaymentSection] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [salaryCalculation, setSalaryCalculation] = useState<any>();
  const [editDetails, setEditDetails] = useState(false);
  const [showSalarySlip, setSalarySlip] = useState(false);

  useEffect(() => {
    handleUpdateEmployees(empId);
  }, []);

  const handleUpdateEmployees = async (empId: any) => {
    try {
      const q = query(collection(db, "employees"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Assuming emp_id is unique
        const employeeData = doc.data();
        console.log("Full employee data", employeeData);
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().emp_id == empId) {
            const result = mergeAttendanceData(doc.data().attendanceData);
            setEmployee(result);
            console.log("result", result);

            const selectedRecord = result?.filter(
              (emp: any) => emp.year === currentYear
            );
            setEmployeePerYear(selectedRecord);
          }
        });
      } else {
        console.log("No documents found in the employees collection.");
      }
      // Success message
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const mergeAttendanceData = (attendanceData: any) => {
    const result: any = [];

    // Helper function to initialize a year's records
    const initializeYear = (year: any) => ({
      year,
      records: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        record: [],
      })),
    });

    attendanceData.forEach(({ year, month, records }: any) => {
      // Find the year in the result, or create a new one if it doesn't exist
      let yearData = result.find((y: any) => y.year === year);
      if (!yearData) {
        yearData = initializeYear(year);
        result.push(yearData);
      }

      // Find the month within the year's records
      const monthData = yearData.records.find((m: any) => m.month === month);
      if (monthData) {
        monthData.record = records; // Assign the records for the month
      }
    });

    return result;
  };

  const handleYearChange = (e: any) => {
    console.log("value changes", e);
    const selectedRecord = employee?.filter((emp: any) => emp.year === e);
    console.log("selectedRecord", selectedRecord);
    setEmployeePerYear(selectedRecord);
  };

  const handlePayout = (record: any, month: any) => {
    showPaymentSection(true);
    const salaryCalc = calculateSalary(record);
    setSelectedMonth(month);
    setSalaryCalculation(salaryCalc);
  };

  const handleSalarySlip = (record: any) => {
    setSalarySlip(true);
    const salaryCalc = calculateSalary(record);
    console.log("salary Cals", salaryCalc);
  };

  // Function to calculate totals
  const calculateSalary = (data: any[]) => {
    let fullDays = 0;
    let halfDays = 0;

    // Iterate through employee data
    data.forEach((record) => {
      if (record.halfDay === "No") {
        fullDays++;
      } else {
        halfDays++;
      }
    });

    // Calculate total salary
    const totalSalary = fullDays * FULL_DAY_SALARY + halfDays * HALF_DAY_SALARY;

    return {
      fullDays,
      halfDays,
      totalSalary,
    };
  };

  const getMonthName = (monthNumber: number) => {
    const month = monthData.find((entry) => entry[monthNumber]);
    return month ? month[monthNumber] : "Invalid month";
  };

  return (
    <>
      {showSalarySlip ? (
        <>
          <Button
            className="w-fit bg-amber-500"
            onClick={() => setSalarySlip(false)}
          >
            Cancel
          </Button>
          <SalarySlip {...payslipData} />
        </>
      ) : (
        <>
          <div>
            <div className="flex justify-between mb-2">
              <div>
                <Select
                  defaultValue={currentYear}
                  onValueChange={(e) => handleYearChange(e)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {employee &&
                      employee?.map((data: any) => (
                        <SelectItem key={data.year} value={data.year}>
                          {data.year}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  className="bg-amber-500"
                  onClick={() => {
                    setEditDetails(!editDetails);
                  }}
                >
                  {!editDetails ? <Edit2Icon /> : <IconCancel />}
                  {!editDetails ? "Edit Details" : "Cancel Edit"}
                </Button>
              </div>
            </div>
          </div>

          {editDetails && <EditDetails empId={empId} />}

          {paymentSection ? (
            <>
              <Button
                className="w-fit bg-amber-500"
                onClick={() => showPaymentSection(false)}
              >
                <MoveLeft />
                Back to Months
              </Button>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <HalfdayChart
                    salaryData={salaryCalculation}
                    selectedMonth={selectedMonth}
                  />
                </div>
                <div className=" col-span-2">
                  <Card className="w-full h-full">
                    <CardHeader>
                      <CardTitle className="mb-2">Payout section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-md mb-2">
                        Employee have{" "}
                        <span className="text-green-600">
                          {salaryCalculation?.fullDays}
                        </span>
                        fulldays and
                        <span className="text-red-600">
                          {salaryCalculation?.halfDays}
                        </span>
                        halfDays
                      </p>
                      <p className="text-md mb-2 flex">
                        <IconCashOff className="font-light mr-3" /> Total Salary
                        to be paid:{" "}
                        <span className="font-bold">
                          {salaryCalculation?.totalSalary}
                        </span>
                      </p>
                      <p className="text-md mb-2 flex">
                        <PhoneCallIcon className="font-light mr-3" /> Employee
                        Phone Number{" "}
                        <span className="font-bold">8796675636</span>
                      </p>
                      <p className="text-md mb-2 flex">
                        <PiggyBank className="font-light mr-3" /> UPI Id:{" "}
                        <span className="font-bold">
                          shubham.shetyanavar@okicici
                        </span>
                      </p>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="name">Name</label>
                            {/* <Input type="text" placeholder="Name of your project" /> */}
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="framework">Framework</label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="sveltekit">
                                  SvelteKit
                                </SelectItem>
                                <SelectItem value="astro">Astro</SelectItem>
                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <PayEmployeeButton
                        amount={1000}
                        employeeUpiId={`shubham.shetyanavar@okicici`}
                      />
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-2 mb-3">
              {employeePerYear &&
                employeePerYear[0].records.map((data: any) => (
                  <div>
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>{getMonthName(data.month)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Total attendance: {data.record.length}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          className="bg-amber-500"
                          onClick={() =>
                            handlePayout(data.record, getMonthName(data.month))
                          }
                        >
                          Payouts
                        </Button>
                        <Button
                          className="bg-secondary text-black hover:text-white"
                          onClick={() => handleSalarySlip(data.record)}
                        >
                          Salary Slip
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
            </div>
          )}
          <div className="">
            {employeePerYear && <Barchart attendanceData={employeePerYear} />}
          </div>
        </>
      )}
    </>
  );
};

export default page;
