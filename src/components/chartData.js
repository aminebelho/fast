"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", tasks: 6},
  { month: "February", tasks: 5 },
  { month: "March", tasks: 7 },
  { month: "April", tasks:  4},
  { month: "May", tasks: 9 },
  { month: "June", tasks: 4 },
  { month: "July", tasks: 4 },
  { month: "August", tasks: 4 },
  { month: "September", tasks: 4 },
  { month: "October", tasks: 4 },
  { month: "November", tasks: 4 },
  { month: "December", tasks: 4 },
]

const chartConfig = {
  tasks: {
    label: "Nombre de tâches",
    color: "#2563eb",
  }
} 

export default function ChartData() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full bg-white rounded-xl border p-4">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={1}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent/>} />

        <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
