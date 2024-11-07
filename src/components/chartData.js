"use client";

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "../lib/axios";


const chartConfig = {
  tasks: {
    label: "Nombre de tâches",
    color: "#10b981",
  }
};

export default function ChartData() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchChartData(token);
    }
  }, []);

  const fetchChartData = async (token) => {
    try {
      const response = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tasks = response.data;
      
      // Transform tasks data to get the count of tasks per month
      const monthlyData = Array(12).fill(0).map((_, i) => ({
        month: new Date(0, i).toLocaleString('en', { month: 'long' }), // Get month name
        tasks: 0,
      }));

      tasks.forEach(task => {
        const month = new Date(task.due_date).getMonth(); // Use `due_date` as the date field
        monthlyData[month].tasks += 1; // Increment task count for the month
      });
      

      setChartData(monthlyData);
    } catch (error) {
      console.error("Failed to fetch tasks data:", error);
    }
  };

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
        <ChartLegend content={<ChartLegendContent />} />

        <Bar dataKey="tasks" fill={chartConfig.tasks.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
