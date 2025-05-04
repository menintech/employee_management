// "use client";

// import { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const PayEmployeeButton = ({ employeeUpiId, amount }) => {
//   const [showQrCode, setShowQrCode] = useState(false);

//   const handlePaymentClick = () => {
//     setShowQrCode(true);
//   };

//   return (
//     <div>
//       <button onClick={handlePaymentClick}>Pay {amount} INR to Employee</button>

//       {showQrCode && (
//         <div style={qrCodeContainerStyle}>
//           <h2>Scan the QR Code with your UPI app</h2>
//           {/* Generate UPI QR code */}
//           <QRCodeCanvas
//             value={`upi://pay?pa=${employeeUpiId}&pn=Employee%20Name&mc=123456&tid=001&tr=123456&tn=Payment%20for%20services&am=${amount}&cu=INR`}
//             size={256}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const qrCodeContainerStyle = {
//   marginTop: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   border: "1px solid #ddd",
//   padding: "20px",
//   borderRadius: "10px",
//   backgroundColor: "#f9f9f9",
// };

// export default PayEmployeeButton;
"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function PayEmployeeButton({ employeeUpiId, amount }: any) {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0 flex">
            <div className="items-center justify-center">
              <h2 className="mb-4">Scan the QR Code with your UPI app</h2>
              {/* Generate UPI QR code */}
              <QRCodeCanvas
                value={`upi://pay?pa=${employeeUpiId}&pn=Employee%20Name&mc=123456&tid=001&tr=123456&tn=Payment%20for%20services&am=${amount}&cu=INR`}
                size={350}
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
