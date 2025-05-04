import { doc, setDoc, Timestamp } from "firebase/firestore";
import { randomBytes } from "crypto";
import db from "@/lib/firestore";

export const sendOtp = async (email: string) => {
  const otp = randomBytes(3).toString("hex").toUpperCase(); // Generate a 6-character OTP
  const userRef = doc(db, "users", email);

  // Save OTP to Firestore with expiration time
  await setDoc(
    userRef,
    {
      otp,
      otpExpiresAt: Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000)), // 5 minutes
    },
    { merge: true }
  );

  // Send OTP via email (example using email API)
  await fetch("/api/send-email", {
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
    }),
    headers: { "Content-Type": "application/json" },
  });
};
