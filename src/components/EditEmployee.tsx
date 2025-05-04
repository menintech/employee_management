import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "@/lib/firestore";

export function EditDetails({ empId }: any) {
  const router = useRouter();
  const [employeeData, setEmployeeData]: any = React.useState({
    emp_id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    adharCard: "",
    address: "",
    employer: "",
    upiId: "",
  });

  // Get employee data by emp_id from Firestore
  React.useEffect(() => {
    const fetchEmployee = async () => {
      const q = query(
        collection(db, "employees"),
        where("emp_id", "==", Number(empId))
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        setEmployeeData(docSnap.data());
      } else {
        console.log("No employee found with emp_id:", empId);
      }
    };
    fetchEmployee();
  }, [empId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const q = query(
        collection(db, "employees"),
        where("emp_id", "==", Number(empId))
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, employeeData);
        console.log("Updated successfully!");
        // router.push("/dashboard/listEmployee");
      } else {
        console.log("No employee found for update.");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Card className="w-full shadow-sm bg-neutral-100 dark:bg-neutral-800">
      <CardHeader>
        <CardTitle>Edit Employee Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 w-full items-center gap-4">
            {[
              { label: "Employee ID", name: "emp_id" },
              { label: "First Name", name: "firstName" },
              { label: "Middle Name", name: "middleName" },
              { label: "Last Name", name: "lastName" },
              { label: "Adhar Card", name: "adharCard" },
              { label: "Address", name: "address" },
              { label: "Employer Name", name: "employer" },
              { label: "UPI ID", name: "upiId" },
            ].map(({ label, name }) => (
              <div key={name} className="grid-cols-12 space-y-1.5">
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  value={employeeData[name as keyof typeof employeeData] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
          <CardFooter className="flex justify-end mt-4 p-0">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
