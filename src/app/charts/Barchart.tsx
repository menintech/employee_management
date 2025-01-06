"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const monthData: Record<number, string>[] = [
  { 1: "Jan" },
  { 2: "Feb" },
  { 3: "Mar" },
  { 4: "Apr" },
  { 5: "May" },
  { 6: "Jun" },
  { 7: "Jul" },
  { 8: "Aug" },
  { 9: "Sep" },
  { 10: "Oct" },
  { 11: "Nov" },
  { 12: "Dec" },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Barchart({ attendanceData }: any) {
  function getMonthName(monthNumber: number) {
    const month = monthData.find((entry) => entry[monthNumber]);
    return month ? month[monthNumber] : "Invalid month";
  }

  const chartMapArray = attendanceData[0]?.records.map((data: any) => ({
    month: getMonthName(data.month),
    record: data.record.length,
  }));

  console.log("attendance record", attendanceData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>
          January - December {attendanceData[0]?.year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[35vh] w-full">
          <BarChart accessibilityLayer data={chartMapArray}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="record" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
