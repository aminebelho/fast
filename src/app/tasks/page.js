"use client"; // Ensure this directive is at the top

import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { EditTaskAlert } from "../../components/editTaskAlert";
import { DeleteTaskAlert } from "../../components/deleteTaskAlert";
import Navbar from "../../components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; 
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Task to edit
  const [open, setOpen] = useState(false); // Dialog open state

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

  // Function to open the edit task dialog
  function handleEdit(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit); // Set the task to be edited
      setOpen(true); // Open the edit dialog
    }
  }

  // Function to update the task
  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        )
      );
      setOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to delete a task
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
        {/* <h1 className="text-2xl font-bold p-2">Vos tâches</h1> */}
        <Card className="w-5/6 shadow-lg m-6">
    <CardHeader>
      <CardTitle className="font-semibold text-center text-2xl font-bold p-2">Vos taches</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="w-full p-4">
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
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                          <Pencil />
                          Edit
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
    </CardContent>
  </Card>
      </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <EditTaskAlert
          task={editingTask}
          onConfirm={updateTask}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default Tasks;
