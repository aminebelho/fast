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
              <Button variant="outline" className="text-red-500 font-semibold w-full">
                  <Trash2 /> Supprimer
              </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Etes vous sûr de vouloir supprimer cette tâche?</AlertDialogTitle>
                  <div className="text-sm text-muted-foreground mt-2">
                      <div>Task: <strong>{task.title}</strong></div>
                      <div>Description: <em>{task.description}</em></div>
                      <div>status: <em>{task.status}</em></div>
                      <div>priority: <em>{task.priority}</em></div>
                      <div>due_date: <em>{task.due_date}</em></div>
                  </div>
                  <AlertDialogDescription>
                    La suppression se fera instantanément.
                  </AlertDialogDescription>
                  
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onConfirm(task.id)} className="bg-red-600">
                      Supprimer tâche
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}
