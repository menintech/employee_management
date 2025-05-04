"use client";

import React from "react";
import Script from "next/script";

const SubscriptionPage = () => {
  const handleSubscription = async (planId: string) => {
    const res = await fetch("/api/razorpay-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data && data.subscriptionId) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId,
        name: "MenInTech Employee Management Solution",
        description: "Monthly Subscription",
        handler: function (response: any) {
          console.log("Payment successful:", response);
          alert("Subscription activated successfully!");
        },
        prefill: {
          email: data.email || "",
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } else {
      alert("Failed to create Razorpay subscription");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {/* BASIC PLAN */}
          <div className="rounded-2xl border border-amber-500 p-6 ring-1 ring-amber-500 sm:px-8 lg:p-12 dark:bg-neutral-800">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Basic <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  ₹12,500
                </strong>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {" "}
                  /month{" "}
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                "20 users included",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="mt-8 block w-full rounded-full border border-amber-500 bg-amber-500 px-12 py-3 text-sm font-medium text-white hover:bg-amber-600 hover:ring-1 hover:ring-amber-600 active:text-amber-500"
              onClick={() => handleSubscription("plan_basic")}
            >
              Subscribe
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="rounded-2xl border border-amber-500 p-6 ring-1 ring-amber-500 sm:px-8 lg:p-12 dark:bg-neutral-800">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Pro <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  ₹25,000
                </strong>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {" "}
                  /month{" "}
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                "20 users included",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="mt-8 block w-full rounded-full border border-amber-500 bg-amber-500 px-12 py-3 text-sm font-medium text-white hover:bg-amber-600 hover:ring-1 hover:ring-amber-600 active:text-amber-500"
              onClick={() => handleSubscription("plan_pro")}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Extracted Icon Component for cleaner JSX
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5 text-amber-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default SubscriptionPage;
