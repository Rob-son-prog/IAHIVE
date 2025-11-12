"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-border bg-card p-6 shadow-xl",
          className
        )}
        {...props}
      >
        <DialogPrimitive.Close className="absolute right-4 top-4 text-muted hover:text-white">
          <X size={18} />
        </DialogPrimitive.Close>
        {props.children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogHeader = ({ children }) => <div className="space-y-1">{children}</div>;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogFooter = ({ children }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;
