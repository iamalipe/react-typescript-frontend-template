import alertPopupApi from "@/components/alert-popup/alert-popup-api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Assuming this path is correct
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";

// --- Public AlertDialog Object ---

// Define the shape of the alert options
export interface AlertPopupOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  type?: "default" | "delete" | "info"; // Predefined types
}

// Define default options for predefined types (remains the same)
const defaultOptions: Record<
  Required<AlertPopupOptions>["type"],
  Partial<AlertPopupOptions>
> = {
  default: {
    title: "Are you sure?",
    description: "Please confirm your action.",
    okText: "Confirm",
    cancelText: "Cancel",
  },
  delete: {
    title: "Confirm Deletion",
    description:
      "This action cannot be undone. Are you sure you want to delete this record?",
    okText: "Delete",
    cancelText: "Cancel",
  },
  info: {
    title: "Information",
    description: "", // Description should be provided when calling
    okText: "OK",
    cancelText: "Close",
  },
};

// --- Provider Component (Manages State and Renders Dialog) ---

// No need for a separate context to expose showAlert anymore,
// but keep it if other context features are needed. For now, we remove it.
// const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

const AlertPopupProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertPopupOptions>({});
  const promiseRef = useRef<{
    resolve: (value: boolean) => void;
    reject: (reason?: string) => void;
  } | null>(null);

  // The core logic to show the alert and return a promise
  const showAlertResolver = useCallback((opts: AlertPopupOptions) => {
    // Merge provided options with defaults based on type
    const typeDefaults = defaultOptions[opts.type || "default"] || {};
    const finalOptions = { ...typeDefaults, ...opts };

    setOptions(finalOptions);
    setIsOpen(true);
    return new Promise<boolean>((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  }, []); // Dependencies: defaultOptions (can be moved outside if static)

  // Effect to update the global API object when the provider mounts/updates
  useEffect(() => {
    // Assign the actual function implementation to the global api holder
    alertPopupApi.show = showAlertResolver;

    // Cleanup function to reset the api holder when the provider unmounts
    // This helps prevent issues in development (Fast Refresh) or if multiple providers were used
    return () => {
      alertPopupApi.show = () => {
        console.error("AlertDialogProvider has unmounted.");
        return Promise.resolve(false);
      };
    };
  }, [showAlertResolver]); // Re-run if showAlertResolver changes (due to dependencies)

  // Handle confirm action
  const handleConfirm = () => {
    if (!promiseRef.current) return;
    promiseRef.current.resolve(true);
    setIsOpen(false);
    promiseRef.current = null;
  };

  // Handle cancel action
  const handleCancel = () => {
    if (!promiseRef.current) return;
    promiseRef.current?.resolve(false);
    setIsOpen(false);
    promiseRef.current = null;
  };

  // Determine button variants (optional styling)
  const okButtonVariant = options.type === "delete" ? "destructive" : "default";

  // No need to provide context value anymore
  return (
    <>
      {/* Render the AlertDialog globally here */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Prevent closing via overlay click if needed, depends on shadcn component behavior */}
        <AlertDialogContent>
          <AlertDialogHeader>
            {options.title && (
              <AlertDialogTitle>{options.title}</AlertDialogTitle>
            )}
            {options.description && (
              <AlertDialogDescription>
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {/* <Input /> */}
          <AlertDialogFooter>
            {options.cancelText && (
              <AlertDialogCancel onClick={handleCancel}>
                {options.cancelText}
              </AlertDialogCancel>
            )}
            {options.okText && (
              <Button onClick={handleConfirm} variant={okButtonVariant}>
                {options.okText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertPopupProvider;
