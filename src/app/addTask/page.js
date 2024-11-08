"use client"; // Ensure this directive is at the top

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Navbar from "../../components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../lib/axios";
import Cookies from "js-cookie"; // Import js-cookie

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 5 characters long" }),
  due_date: z.string().nonempty({ message: "Due date is required" }),
});

const AddTask = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true); // Set loading state
  const [taskData, setTaskData] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      due_date: "",
    },
  });

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    const email = Cookies.get("userEmail"); // Get email from cookies
    
    console.log("Token in AddTask:", token); // Log token to check if it's present
    console.log("User Email in AddTask:", email); // Log email to check if it's present

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setUserEmail(email);
      setLoading(false); // Set loading to false once token is verified
    }
  }, [router]);

  const onSubmit = async (data) => {
    setTaskData(data);
    try {
      const token = Cookies.get("token");
      await axios.post("/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#d1fae5]">
        <div className="text-xl font-bold">Chargement...</div>
      </div>
    ); // Display loading screen while checking login status
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
    </>
  );
};

export default AddTask;
