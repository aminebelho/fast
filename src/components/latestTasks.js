// components/StatCard.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; 
import axios from "../lib/axios";

const LatestTasks = () => {
  const [latesttasks, setLatestTasks] = useState([]);

  // Function to get current month and year in "MMM YYYY" format, e.g., "avril 2024"
  const getCurrentMonthYear = () => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })
      .format(new Date())
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
  };

  useEffect(() => {
    const fetchLatestTasks = async () => {
      try {
        const response = await axios.get(`/tasks`);
        
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so +1
        const currentYear = new Date().getFullYear();

        const filteredTasks = response.data.filter(task => {
          const [year, month] = task.due_date.split('-');
          return parseInt(year) === currentYear && parseInt(month) === currentMonth;
        });

        setLatestTasks(filteredTasks.slice(0, 3));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchLatestTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card className="w-full h-full p-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Tâches dues pour {getCurrentMonthYear()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {latesttasks.length > 0 ? (
          latesttasks.map((task) => (
            <div key={task.id} className="mt-4">
              <p className="font-bold">{task.title}</p>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">{formatDate(task.due_date)}</p>
            </div>
          ))
        ) : (
          <p>Aucune tâche due ce mois-ci.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestTasks;
