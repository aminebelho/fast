"use client"; // Ensure this directive is at the top

import { useState } from "react";
import { useForm } from "react-hook-form";
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

  const onSubmit = async (data) => {
    try {
      await axios.post("/tasks", data); // Replace with your actual endpoint
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-max min-h-screen bg-[#a7f3d0] p-4">
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
                                  <SelectItem value="moyenne">
                                    Moyenne
                                  </SelectItem>
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
                                  <SelectItem value="en cours">
                                    En cours
                                  </SelectItem>
                                  <SelectItem value="terminé">
                                    Terminé
                                  </SelectItem>
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
                    <div className="w-1/2 p-4 flex items-end">
                      <Button type="submit">Ajouter la tâche</Button>
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
