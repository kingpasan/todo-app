import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AlertDialog = {
  open: boolean | undefined;
  onOpenChange: ((open: boolean) => void) | undefined;
  title?: string;
  message?: string;
};

const AlertDialog = ({ open, onOpenChange, title, message }: AlertDialog) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ? title : "Something went wrong!"} </DialogTitle>
          <DialogDescription>
            We couldn't complete your request.
          </DialogDescription>
        </DialogHeader>

        <div
          role="alert"
          className="rounded border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
        >
          {message}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
