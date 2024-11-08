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
  
  export function AddTaskAlert({ task, onConfirm, isOpen, onClose }) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogTrigger asChild>
          {/* <Button className="bg-[#059669]">Ajouter la tâche</Button> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Etes-vous sûr de vouloir ajouter cette tâche ?
            </AlertDialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              {/* Conditional Rendering */}
              {task ? (
                <>
                  <div>Task: <strong>{task.title}</strong></div>
                  <div>Description: <em>{task.description}</em></div>
                  <div>status: <em>{task.status}</em></div>
                  <div>priority: <em>{task.priority}</em></div>
                  <div>due_date: <em>{task.due_date}</em></div>
                </>
              ) : (
                <div>Loading task details...</div>
              )}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (task) {
                  onConfirm(task); // Only call onConfirm if task is available
                  onClose(); // Close the dialog after confirming
                }
              }}
              className="bg-[#059669]"
            >
              Ajouter tâche
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  