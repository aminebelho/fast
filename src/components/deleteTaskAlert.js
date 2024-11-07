// components/DeleteTaskDialog.js
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteTaskAlert({ task, onConfirm }) {
  return (
      <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 w-full">
                  <Trash2 /> Delete
              </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
                  <div className="text-sm text-muted-foreground mt-2">
                      <div>Task: <strong>{task.title}</strong></div>
                      <div>Description: <em>{task.description}</em></div>
                  </div>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                  
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onConfirm(task.id)}>
                      Delete Task
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}
