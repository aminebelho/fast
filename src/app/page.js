"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import StatCard from "../components/statcard";
import ChartData from "../components/chartData";
import LatestTasks from "../components/latestTasks";
import axios from "../lib/axios";
import Cookies from "js-cookie"; // Import js-cookie
import { Loader } from "lucide-react"; 


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
    const token = Cookies.get("token"); // Get token from cookies
    const email = Cookies.get("userEmail"); // Get email from cookies

    console.log("Token in HomePage:", token); // Log token to check if it's present
    console.log("User Email in HomePage:", email); // Log email to check if it's present

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setUserEmail(email);
      fetchTasksCount(token); // Fetch tasks if the token exists
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
      <div className="flex flex-col items-center h-screen bg-[#d1fae5] p-4">
        {userEmail ? (
          <div className="h-full">
            <div className="p-4 text-2xl font-bold">Tableau de bord</div>
            <div className="flex justify-between">
              {statCardsData.map((data, index) => (
                <StatCard key={index} title={data.title} value={data.value} />
              ))}
            </div>
            <div className="flex">
              <div className="w-3/5 p-4">
                <ChartData />
              </div>
              <div className="w-2/5 p-4">
                <LatestTasks />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin h-10 w-10 text-gray-500" />
        </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
