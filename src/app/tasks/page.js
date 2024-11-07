"use client"; // Ensure this directive is at the top

import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { EditTaskAlert } from "../../components/editTaskAlert";
import { DeleteTaskAlert } from "../../components/deleteTaskAlert";
import Navbar from "../../components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          variant={currentPage === i + 1 ? "solid" : "ghost"}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortField, setSortField] = useState("due_date"); 
  const [sortDirection, setSortDirection] = useState("asc"); 

  useEffect(() => {
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

  // Filter tasks based on status and priority
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      !statusFilter || statusFilter === "all" || task.status === statusFilter;
    const priorityMatch =
      !priorityFilter || priorityFilter === "all" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Sort tasks by the selected field and direction
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      const fieldA = sortField === "due_date" ? new Date(a.due_date) : a.id;
      const fieldB = sortField === "due_date" ? new Date(b.due_date) : b.id;

      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
        return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
    });
  };

  const filteredAndSortedTasks = sortTasks(filteredTasks);
  const totalPages = Math.ceil(filteredAndSortedTasks.length / pageSize);
  const paginatedTasks = filteredAndSortedTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  function handleEdit(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setOpen(true);
    }
  }

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        )
      );
      setOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

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
        <Card className="w-5/6 shadow-lg m-6">
          <CardHeader>
            <CardTitle className="font-semibold text-center text-2xl font-bold p-2">
              Vos tâches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full p-4">
              {/* Filters */}
              <div className="flex justify-end mb-4">
                <div className="flex space-x-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="px-4 py-2 border rounded-lg">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Status</SelectItem>{" "}
                        <SelectItem value="en cours">En cours</SelectItem>
                        <SelectItem value="terminé">Terminé</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger className="px-4 py-2 border rounded-lg">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Priority</SelectItem>{" "}
                        <SelectItem value="basse">Basse</SelectItem>
                        <SelectItem value="moyenne">Moyenne</SelectItem>
                        <SelectItem value="haute">Haute</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              <Table className="w-full bg-white rounded-xl border-0">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/12 p-4">Id</TableHead>
                    <TableHead className="w-3/12 p-4">Task</TableHead>
                    <TableHead className="w-3/12 p-4">Description</TableHead>
                    <TableHead className="w-1/12 p-4">Status</TableHead>
                    <TableHead className="w-1/12 p-4">Priority</TableHead>
                    <TableHead className="w-2/12 p-4">
                      <button
                        className="text-left"
                        onClick={() => {
                          setSortField("due_date");
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc"
                          );
                        }}
                      >
                        Due Date{" "}
                        {sortField === "due_date" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </button>
                    </TableHead>
                    <TableHead className="w-1/12 p-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-bold p-4">{task.id}</TableCell>
                      <TableCell className="font-bold p-4">
                        {task.title}
                      </TableCell>
                      <TableCell className="font-medium p-4">
                        {task.description}
                      </TableCell>
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
                            <DropdownMenuItem
                              onClick={() => handleEdit(task.id)}
                            >
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <DeleteTaskAlert
                                task={task}
                                onConfirm={deleteTask}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center w-full p-4 font-bold"
                    >
                      Total Tasks: {filteredTasks.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

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
