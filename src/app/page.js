// app/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import StatCard from "../components/statcard";
import ChartData  from "../components/chartData";
import axios from "../lib/axios";

const HomePage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [tasksCount, setTasksCount] = useState(0);
  const [tasksEnCoursCount, setTasksEnCoursCount] = useState(0);
  const [tasksTerminesCount, setTasksTerminesCount] = useState(0);

  // Define card data in an array
  const statCardsData = [
    { title: "Nombre de Tâches", value: tasksCount },
    { title: "Tâches En Cours", value: tasksEnCoursCount },
    { title: "Tâches Terminés", value: tasksTerminesCount },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      router.push("/login");
    } else {
      setUserEmail(email);
      fetchTasksCount(token);
    }
  }, [router]);
  const fetchTasksCount = async (token) => {
    try {
      const response = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tasks = response.data;
      setTasksCount(response.data.length);

      const enCoursTasksCount = tasks.filter(
        (task) => task.status === "en cours"
      ).length;
      setTasksEnCoursCount(enCoursTasksCount);

      const terminesTasksCount = tasks.filter(
        (task) => task.status === "terminé"
      ).length;
      setTasksTerminesCount(terminesTasksCount);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-green-200 p-16">
        {userEmail ? (
          <div className="">
            <div className="flex space-x-4">
              {statCardsData.map((data, index) => (
                <StatCard key={index} title={data.title} value={data.value} />
              ))}
            </div>
            <div className="flex">
              <div className="w-3/5 p-4 ">
              <ChartData />
              </div>

            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
