"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import MonthPicker from "@/components/MonthPicker";

type EmployeeRecord = {
  emp_id: number;
  date_time: string;
};

type EmployeeDayTimes = {
  inTime: string;
  outTime: string;
  totalHours?: string;
  halfDay?: string;
};

type MergedEmployeeTimes = Record<
  number,
  {
    totalRecords: number;
    dates: Record<string, EmployeeDayTimes>;
  }
>;

type EmployeeDetails = {
  id: number;
  emp_id: number;
  totalRecords: number;
  details: Record<string, EmployeeDayTimes>;
};

export default function UploadFile() {
  const [tableData, setTableData] = useState<EmployeeDetails[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null); // State for expanded row
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState<string | null>(null);

  const rowsPerPage = 10;

  const requiredHeaders = ["emp_id", "date_time"];

  const toggleRowExpansion = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  function parseTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes; // Convert time to total minutes since 00:00
  }

  function convertToDate(
    dateStr: string
  ): { date: string; time: string } | null {
    if (typeof dateStr !== "string") {
      console.error(`Invalid date format: ${dateStr}`);
      return null; // Return null if the input is not a valid string
    }

    const [date, time] = dateStr.split(" ");
    if (!date || !time) {
      console.error(`Invalid date_time format: ${dateStr}`);
      return null;
    }

    const [month, day, year] = date.split("/");
    const formattedDate = `${month}/${day}/${year.slice(-2)}`; // Format as "4/1/24"
    return { date: formattedDate, time };
  }

  function mergeEmployeeTimesWithCount(
    data: EmployeeRecord[]
  ): MergedEmployeeTimes {
    const employeeTimes: MergedEmployeeTimes = {};

    data.forEach((record) => {
      const { emp_id, date_time } = record;
      const { date, time } = convertToDate(date_time) || {};

      if (!date || !time) return;

      if (!employeeTimes[emp_id]) {
        employeeTimes[emp_id] = { totalRecords: 0, dates: {} };
      }

      const employee = employeeTimes[emp_id];

      if (!employee.dates[date]) {
        // Initialize the inTime and outTime for the date
        employee.dates[date] = { inTime: time, outTime: time };
        employee.totalRecords++;
      } else {
        const currentInMinutes = parseTimeToMinutes(time);
        const inMinutes = parseTimeToMinutes(employee.dates[date].inTime);
        const outMinutes = parseTimeToMinutes(employee.dates[date].outTime);

        // Update inTime if the current time is earlier
        if (currentInMinutes < inMinutes) {
          employee.dates[date].inTime = time;
        }

        // Update outTime if the current time is later
        if (currentInMinutes > outMinutes) {
          employee.dates[date].outTime = time;
        }
      }

      // Calculate totalHours and determine if it's a half day
      const { inTime, outTime } = employee.dates[date];
      const totalMinutes = calculateTimeDifference(inTime, outTime);
      const totalHours = (totalMinutes / 60).toFixed(2); // Convert minutes to hours and format to 2 decimal places
      employee.dates[date].totalHours = totalHours;
      employee.dates[date].halfDay = parseFloat(totalHours) < 4 ? "Yes" : "No";
    });

    return employeeTimes;
  }

  function calculateTimeDifference(start: string, end: string): number {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    // Convert both times to minutes since midnight
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Handle cases where end time rolls over midnight
    if (endTotalMinutes < startTotalMinutes) {
      return 24 * 60 - startTotalMinutes + endTotalMinutes; // Time difference in minutes
    }

    return endTotalMinutes - startTotalMinutes; // Time difference in minutes
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: EmployeeRecord[] = XLSX.utils.sheet_to_json(sheet, {
        raw: false,
      });

      // Parse and process data (assuming your merge logic here)
      const mergedData = mergeEmployeeTimesWithCount(jsonData);
      const formattedData: EmployeeDetails[] = Object.entries(mergedData).map(
        ([emp_id, { totalRecords, dates }], index) => ({
          id: index + 1,
          emp_id: Number(emp_id),
          totalRecords,
          details: dates,
        })
      );

      setTableData(formattedData);
      console.log('formattedData', formattedData)
      // Get the headers from the sheet
      const headers = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      })[0] as string[];

      // Validate the headers
      const isValid = requiredHeaders.every((header) =>
        headers.includes(header)
      );
      if (!isValid) {
        setError("The uploaded Excel file does not match the required format.");
        return;
      }

      setError(null); // Clear any error
    };
    reader.onerror = () => alert("An error occurred while reading the file.");
  };


  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleMonthSelect = (year: number, month: number) => {
    console.log(`Selected Year: ${year}, Selected Month: ${month}`);
    // Use the year and month for filtering or fetching data
  };

  return (
    <div className="p-4">
      <MonthPicker onMonthSelect={handleMonthSelect} />
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Employee ID</th>
            <th className="border px-2 py-1">Records</th>
            <th className="border px-2 py-1">Details</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <React.Fragment key={row.id}>
              {/* Main Row */}
              <tr>
                <td className="border px-2 py-1 text-center">{row.id}</td>
                <td className="border px-2 py-1 text-center">{row.emp_id}</td>
                <td className="border px-2 py-1 text-center">
                  {row.totalRecords}
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => toggleRowExpansion(row.id)}
                  >
                    {expandedRowId === row.id ? "Hide Details" : "View Details"}
                  </button>
                </td>
              </tr>
              {/* Collapsible Details Row */}
              {expandedRowId === row.id && (
                <tr>
                  <td colSpan={4} className="border px-2 py-1">
                    <table className="w-full mt-2 border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-2 py-1">Date</th>
                          <th className="border px-2 py-1">In Time</th>
                          <th className="border px-2 py-1">Out Time</th>
                          <th className="border px-2 py-1">Total Hours</th>{" "}
                          {/* New column */}
                          <th className="border px-2 py-1">Half Day</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(row.details).map(
                          ([
                            date,
                            { inTime, outTime, totalHours, halfDay },
                          ]) => (
                            <tr key={date}>
                              <td className="border px-2 py-1 text-center">
                                {date}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {inTime}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {outTime}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {totalHours}
                              </td>{" "}
                              {/* Display totalHours */}
                              <td className="border px-2 py-1 text-center">
                                {halfDay}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRows={tableData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
