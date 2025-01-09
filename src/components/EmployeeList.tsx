import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Pagination } from "./ui/pagination";
import { collection, getDocs, query } from "@firebase/firestore";
import db from "@/lib/firestore";

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
  id: string;
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

const EmployeeList = () => {
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const rowsPerPage = 10;

  // Function to toggle the visibility of attendance details for an employee
  const handleShowDetails = (emp_id: number) => {
    router.push(`/dashboard/listEmployee/${emp_id}`);
  };

  const paginatedData = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    console.log(getEmployeesCollectionFromFirebase());
  }, []);

  async function getEmployeesCollectionFromFirebase(): Promise<any[]> {
    try {
      // Reference to the "employees" collection
      const employeesCollectionRef = collection(db, "employees");

      // Fetch all documents in the "employees" collection
      const querySnapshot = await getDocs(employeesCollectionRef);

      // Map through the documents and structure the data
      const employees: any = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Document data
      }));

      setEmployees(employees);
      return employees;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }
  return (
    <div>
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
