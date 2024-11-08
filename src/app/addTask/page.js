"use client"; // Ensure this directive is at the top

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "../../lib/axios";
import Navbar from "../../components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTaskAlert } from "../../components/addTaskAlert"; // Import the AddTaskAlert component
import Cookies from 'js-cookie';
import { Loader } from "lucide-react"; 

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 5 characters long" }),
  priority: z.enum(["basse", "moyenne", "haute", "urgente"], {
    message: "Select a valid priority",
  }),
  status: z.enum(["en cours", "terminé"], { message: "Select a valid status" }),
  due_date: z.string().nonempty({ message: "Due date is required" }),
});

const AddTask = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "basse",
      status: "en cours",
      due_date: "",
    },
  });



  const [taskData, setTaskData] = useState(null);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const onSubmit = async (data) => {
    setTaskData(data); // Store form data in state
    setAlertOpen(true); // Open the confirmation dialog
  };

  const handleConfirm = async (task) => {
    try {
      await axios.post("/tasks", task); // Add the task to the server
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const router = useRouter();
    // Client-side protection: Check for token
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
        } else {
          setLoading(false); // Set loading to false once authenticated
        }
      }, []);
    
      if (loading) {
        return (
          <div className="flex justify-center items-center  bg-[#d1fae5] h-screen">
            <Loader className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        );
      }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-max min-h-screen bg-[#d1fae5] p-4">
        <Card className="w-5/6 shadow-lg m-6">
          <CardHeader>
            <CardTitle className="font-semibold text-center text-2xl font-bold p-2">
              Ajouter une tâche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full justify-center p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex">
                    <div className="w-1/2 p-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre de la tâche</FormLabel>
                            <FormControl>
                              <Input placeholder="Titre" {...field} />
                            </FormControl>
                            {form.formState.errors.title && (
                              <FormMessage>
                                {form.formState.errors.title.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2 p-4">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                            {form.formState.errors.description && (
                              <FormMessage>
                                {form.formState.errors.description.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-4">
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priorité</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir la priorité" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="basse">Basse</SelectItem>
                                  <SelectItem value="moyenne">Moyenne</SelectItem>
                                  <SelectItem value="haute">Haute</SelectItem>
                                  <SelectItem value="urgente">Urgente</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.priority && (
                              <FormMessage>
                                {form.formState.errors.priority.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2 p-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir le statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="en cours">En cours</SelectItem>
                                  <SelectItem value="terminé">Terminé</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.status && (
                              <FormMessage>
                                {form.formState.errors.status.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-4">
                      <FormField
                        control={form.control}
                        name="due_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date d'échéance</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            {form.formState.errors.due_date && (
                              <FormMessage>
                                {form.formState.errors.due_date.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2 p-4 flex justify-end items-end">
                      <Button type="submit" className="w-1/3 bg-[#059669]">
                        Ajouter la tâche
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AddTaskAlert Component for confirmation */}
      <AddTaskAlert
        task={taskData}
        onConfirm={handleConfirm}
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default AddTask;
