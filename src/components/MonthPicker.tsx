"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const MonthPicker = ({
  onMonthSelect,
}: {
  onMonthSelect: (year: number, month: number) => void;
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based index for months (Jan = 0)

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    onMonthSelect(selectedYear, monthIndex + 1); // +1 because months are 0-indexed
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">
          {selectedMonth !== null
            ? `${months[selectedMonth]} ${selectedYear}`
            : "Select Month"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-64">
        <div className="flex items-center gap-4 mb-4">
          {/* Previous Year Button */}
          <Button
            variant="outline"
            onClick={() => setSelectedYear((prev) => prev - 1)}
          >
            {"<"}
          </Button>

          <span className="text-lg font-semibold">{selectedYear}</span>

          {/* Next Year Button */}
          <Button
            variant="outline"
            disabled={selectedYear >= currentYear} // Disable future years
            onClick={() => setSelectedYear((prev) => prev + 1)}
          >
            {">"}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => {
            const isDisabled =
              selectedYear === currentYear && index > currentMonth; // Disable future months only for the current year

            return (
              <Button
                key={month}
                variant={
                  selectedMonth === index && !isDisabled ? "default" : "outline"
                }
                disabled={isDisabled}
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
