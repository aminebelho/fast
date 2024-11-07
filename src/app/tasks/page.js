// app/login/page.js
"use client"; // Ensure this directive is at the top

import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import Navbar from "../../components/navbar";
import { DeleteTaskAlert } from "../../components/deleteTaskAlert";
import { Ellipsis, Trash2, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks"); 
        setTasks(response.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  function handleEdit(taskId) {
    console.log("Edit task", taskId);
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-max min-h-screen bg-[#00d084] p-4">
        <h1 className="text-2xl font-bold p-2">Vos tâches</h1>
        <div className="w-5/6 p-12">
          <Table className="w-full bg-white rounded-xl border-0">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12 p-4">Id</TableHead>
                <TableHead className="w-3/12 p-4">Task</TableHead>
                <TableHead className="w-4/12 p-4">Description</TableHead>
                <TableHead className="w-1/12 p-4">Status</TableHead>
                <TableHead className="w-1/12 p-4">Priority</TableHead>
                <TableHead className="w-1/12 p-4">Due Date</TableHead>
                <TableHead className="w-1/12 p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-bold p-4">{task.id}</TableCell>
                  <TableCell className="font-bold p-4">{task.title}</TableCell>
                  <TableCell className="font-medium p-4">{task.description}</TableCell>
                  <TableCell className="p-4">{task.status}</TableCell>
                  <TableCell className="p-4">{task.priority}</TableCell>
                  <TableCell className="p-4">
                    {new Date(task.due_date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <DeleteTaskAlert task={task} onConfirm={deleteTask} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="w-full">
                <TableCell colSpan={7} className="text-center w-full p-4 font-bold">
                  Total Tasks: {tasks.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
