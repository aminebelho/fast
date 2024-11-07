import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";

export function EditTaskAlert({ task, onConfirm, open, setOpen }) {
  const methods = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
    },
  });

  // Reset form values when task changes
  useEffect(() => {
    if (task) {
      methods.reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
      });
    }
  }, [task, methods]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    if (!task.id) {
      console.error("No task id provided");
      return;
    }
    onConfirm({ ...data, id: task.id }); // Ensure the task id is passed with the updated data
    setOpen(false); // Close the dialog after submitting
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{/* Edit Task Trigger (if any) */}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier une tâche</DialogTitle>
          <DialogDescription>
            Make changes to the task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <div className="flex">
              <Label htmlFor="title" className="w-1/3 p-2">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                {...methods.register("title")}
                className="col-span-3 w-2/3"
              />
            </div>

            {/* Description Field as Textarea */}
            <div className="flex">
              <Label htmlFor="description" className="w-1/3 p-2">
                Description
              </Label>
              <textarea
                id="description"
                {...methods.register("description")}
                className="col-span-3 w-2/3 p-2 border rounded-md"
                rows="4"
              />
            </div>

            {/* Status Field as Native Select */}
            <div className="flex">
              <Label htmlFor="status" className="w-1/3 p-2">
                Status
              </Label>
              <Controller
                control={methods.control}
                name="status"
                render={({ field }) => (
                  <select
                    id="status"
                    {...field}
                    className="col-span-3 w-2/3 p-2 border rounded-md"
                  >
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                  </select>
                )}
              />
            </div>

            {/* Priority Field as Native Select */}
            <div className="flex">
              <Label htmlFor="priority" className="w-1/3 p-2">
                Priority
              </Label>
              <Controller
                control={methods.control}
                name="priority"
                render={({ field }) => (
                  <select
                    id="priority"
                    {...field}
                    className="col-span-3 w-2/3 p-2 border rounded-md"
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                    <option value="urgente">Urgente</option>
                  </select>
                )}
              />
            </div>

            {/* Due Date Field */}
            <div className="flex">
              <Label htmlFor="due_date" className="w-1/3 p-2">
                Due Date
              </Label>
              <Input
                type="date"
                id="due_date"
                {...methods.register("due_date")}
                className="col-span-3 w-2/3"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-[#059669]">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
