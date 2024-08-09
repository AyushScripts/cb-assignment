"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const dashUser = [
  {
    name: "John Snow",
    email: "johnsnow@gmail.com",
    sales: "+$1344.00",
  },
  {
    name: "Daenarys Targaeryan",
    email: "rhaegar@gmail.com",
    sales: "+$844.00",
  },
  {
    name: "Tyrion Lanister",
    email: "smartelf@gmail.com",
    sales: "+$8344.00",
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:border md:border-slate-500 rounded-xl md:m-10 py-10">
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full border border-slate-500 rounded-xl "
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>

      <div className="border border-slate-500 rounded-xl overflow-hidden">
        <div className="flex flex-col space-y-1.5 p-6 mb-2">
          <h3 className="font-semibold text-white text-lg">Recent Sales</h3>
          <p className="text-gray-400 text-sm">You made 265 sales this month</p>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-6">
            {dashUser.map((idx) => (
              <div
                key={idx.email}
                className="flex flex-col md:flex-row items-start md:items-center justify-between md:space-x-4 py-2 md:py-4 border-b border-gray-700"
              >
                <div className="flex flex-col">
                  <h2 className="text-white text-sm">{idx.name}</h2>
                  <p className="text-gray-400 text-xs">{idx.email}</p>
                </div>
                <h2 className="font-bold text-white text-sm">{idx.sales}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
