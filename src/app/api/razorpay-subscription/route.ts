import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_RAZORPAY_KEY_SECRET!,
});

console.log(
  "🔐 Razorpay creds:",
  process.env.RAZORPAY_KEY_ID,
  process.env.RAZORPAY_KEY_SECRET
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟡 Received request:", body);

    const planMap: Record<string, string> = {
      plan_basic: "plan_QQnAtDWhJtViGv",
      plan_pro: "plan_QQnBD0H9QD7DSr",
    };

    const planId = planMap[body.planId];

    if (!planId) {
      console.error("❌ Invalid planId:", body.planId);
      return NextResponse.json({ error: "Invalid planId" }, { status: 400 });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
    });

    console.log("✅ Razorpay subscription created:", subscription);

    return NextResponse.json({
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error("🔥 Internal error in API:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err },
      { status: 500 }
    );
  }
}
