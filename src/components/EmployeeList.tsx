import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Pagination } from "./ui/pagination";

// Employee Data Type Definitions
interface AttendanceRecord {
  date: string;
  inTime: string;
  outTime: string;
  totalHours: number;
  halfDay: boolean;
}

interface AttendanceData {
  year: string;
  month: number;
  records: AttendanceRecord[];
}

interface Employee {
  emp_id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  address: string;
  adharCard: string;
  attendanceData: AttendanceData[];
  isActive: boolean;
  employer: string;
}

const EmployeeList: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Function to toggle the visibility of attendance details for an employee
  const handleShowDetails = (emp_id: number) => {
    router.push(`/dashboard/listEmployee/${emp_id}`);
    const selectedEmp = employees.filter((emp) => emp.emp_id === emp_id);
    console.log("employee", selectedEmp);
    if (!ISSERVER)
      localStorage.setItem(
        "empDetails",
        JSON.stringify(selectedEmp[0].attendanceData)
      );
  };

  const paginatedData = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <React.Fragment key={emp.emp_id}>
              <tr>
                <td className="border px-4 py-2">{emp.emp_id}</td>
                <td className="border px-4 py-2">
                  {emp.firstName} {emp.middleName} {emp.lastName}
                </td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">
                  {emp.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border px-4 py-2">
                  <Button
                    onClick={() => handleShowDetails(emp.emp_id)}
                    className="text-white px-4 py-2 rounded"
                  >
                    Show Details
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table> */}

      {employees.length !== 0 && (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Employee ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <React.Fragment key={row.emp_id}>
                  {/* Main Row */}
                  <tr>
                    <td className="border px-4 py-2">{row.emp_id}</td>
                    <td className="border px-4 py-2">
                      {row.firstName} {row.middleName} {row.lastName}
                    </td>
                    <td className="border px-4 py-2">{row.email}</td>
                    <td className="border px-4 py-2">
                      {row.isActive ? (
                        <span className="text-xs bg-green-500 p-2 rounded-xl">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs bg-red-500 p-2 rounded-xl">
                          In-active
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <Button
                        onClick={() => handleShowDetails(row.emp_id)}
                        className="px-4 py-2 rounded"
                      >
                        Show Details
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Pagination
            totalRows={employees.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default EmployeeList;
