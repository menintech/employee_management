"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Barchart } from "@/app/charts/Barchart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HalfdayChart } from "@/app/charts/halfdayChart";
import { Input } from "@/components/ui/input";

const EmployeeDetails = () => {
  const { empId } = useParams();
  const router = useRouter();
  const [empRecord, setEmpRecord] = useState<any[]>();
  const empdDetails = localStorage.getItem("empDetails");
  const [employeePerYear, setEmployeePerYear] = useState<any[]>();
  const [paymentSection, showPaymentSection] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [salaryCalculation, setSalaryCalculation] = useState<any>();

  useEffect(() => {
    if (empdDetails) {
      const mergedData = mergeAttendanceData(JSON.parse(empdDetails));
      console.log(mergedData);
      setEmpRecord(mergedData);
    }
  }, [empdDetails]);

  const mergeAttendanceData = (attendanceData: any[]) => {
    const result: any = [];

    // Helper function to initialize a year's records
    const initializeYear = (year: any) => ({
      year,
      records: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        record: [],
      })),
    });

    attendanceData.forEach(({ year, month, records }) => {
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

  const getMonthName = (monthNumber: number) => {
    const month = monthData.find((entry) => entry[monthNumber]);
    return month ? month[monthNumber] : "Invalid month";
  };

  const handleYearChange = (e: any) => {
    console.log("value changes", e);
    const selectedRecord = empRecord?.filter((emp) => emp.year === e);
    console.log("selectedRecord", selectedRecord);
    setEmployeePerYear(selectedRecord);
  };

  const handlePayout = (record: any, month: any) => {
    showPaymentSection(true);
    const salaryCalc = calculateSalary(record);
    setSelectedMonth(month);
    setSalaryCalculation(salaryCalc);
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

  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <div>
            <Button onClick={() => router.push("/dashboard/listEmployee")}>
              <MoveLeft />
              Back
            </Button>
          </div>

          <div>
            <Select onValueChange={handleYearChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {empRecord &&
                  empRecord.map((data) => (
                    <SelectItem value={data.year}>{data.year}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="">
        {employeePerYear && <Barchart attendanceData={employeePerYear} />}
      </div>
      {paymentSection ? (
        <>
          <div className="flex justify-between -mt-3 mb-5 overflow-hidden">
            <div>
              <Button onClick={() => showPaymentSection(false)}>
                <MoveLeft />
                Back to Months
              </Button>
            </div>
          </div>
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
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name">Name</label>
                        <Input id="name" placeholder="Name of your project" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="framework">Framework</label>
                        <Select>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => showPaymentSection(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Deploy</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-6 grid-rows-1 gap-4 mt-2">
          {employeePerYear &&
            employeePerYear[0].records.map((data) => (
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
                      onClick={() =>
                        handlePayout(data.record, getMonthName(data.month))
                      }
                    >
                      Payouts
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default EmployeeDetails;
