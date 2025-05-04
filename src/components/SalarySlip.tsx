import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface SalarySlipProps {
  employeeName: string;
  siteName: string;
  department: string;
  idNo: string;
  srNo: string;
  payableDays: number;
  otHrs: number;
  uanNo: string;
  esicNo: string;
  basic: number;
  da: number;
  hra: number;
  conveyance: number;
  otAmount: number;
  pf: number;
  esic: number;
  pt: number;
  deductions: number;
  totalGross: number;
  netInHand: number;
  monthYear: string;
}

const SalarySlip: React.FC<SalarySlipProps> = (props) => {
  const slipRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (slipRef.current) {
      const canvas = await html2canvas(slipRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Adjusted for A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      const fileName = `${props.idNo}-${props.monthYear}.pdf`;
      pdf.save(fileName);
    }
  };

  return (
    <div className="max-w-lg mx-auto border p-6 bg-white shadow-lg text-sm">
      <div ref={slipRef} className="printable-area bg-white p-4">
        <div className="text-center font-bold text-lg mb-2">
          Payslip - {props.monthYear}
        </div>

        <div className="border-b pb-2 mb-2">
          <p>
            <strong>Sr.No:</strong> {props.srNo}
          </p>
          <p>
            <strong>Shree Manpower Services ID:</strong> {props.idNo}
          </p>
          <p>
            <strong>Site Name:</strong> {props.siteName}
          </p>
          <p>
            <strong>Department:</strong> {props.department}
          </p>
        </div>

        <div className="border-b pb-2 mb-2">
          <p>
            <strong>Employee Name:</strong> {props.employeeName}
          </p>
          <p>
            <strong>Payable Days:</strong> {props.payableDays}
          </p>
          <p>
            <strong>OT Hours:</strong> {props.otHrs}
          </p>
          <p>
            <strong>UAN No:</strong> {props.uanNo}
          </p>
          <p>
            <strong>ESIC No:</strong> {props.esicNo}
          </p>
        </div>

        <table className="w-full border-collapse border border-gray-300 mb-3">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Earnings</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Deductions</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Basic</td>
              <td className="border p-2">{props.basic.toFixed(2)}</td>
              <td className="border p-2">PF</td>
              <td className="border p-2">{props.pf.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border p-2">DA</td>
              <td className="border p-2">{props.da.toFixed(2)}</td>
              <td className="border p-2">ESIC</td>
              <td className="border p-2">{props.esic.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border p-2">HRA</td>
              <td className="border p-2">{props.hra.toFixed(2)}</td>
              <td className="border p-2">PT</td>
              <td className="border p-2">{props.pt.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border p-2">OT Amount</td>
              <td className="border p-2">{props.otAmount.toFixed(2)}</td>
              <td className="border p-2 font-bold">Total Deductions</td>
              <td className="border p-2 font-bold">
                {props.deductions.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between font-bold text-lg">
          <p>Total Gross: ₹{props.totalGross.toFixed(2)}</p>
          <p>Net In Hand: ₹{props.netInHand.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download Payslip
      </button>
    </div>
  );
};

export default SalarySlip;
