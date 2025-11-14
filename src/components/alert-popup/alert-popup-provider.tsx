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
  customElement?: React.ReactNode;
  cancelText?: string;
  type?: "default" | "delete"; // Predefined types
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
      "This action cannot be undone. Are you sure you want to delete this?",
    okText: "Delete",
    cancelText: "Cancel",
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
    resolve: (value: { response: boolean; [k: string]: any }) => void;
    reject: (reason?: { response: boolean; [k: string]: any }) => void;
  } | null>(null);

  // Keep track of the current custom element ref for the active dialog instance
  const currentCustomRef = useRef<React.RefObject<any> | null>(null);

  // The core logic to show the alert and return a promise
  const showAlertResolver = useCallback((opts: AlertPopupOptions) => {
    // Merge provided options with defaults based on type
    const typeDefaults = defaultOptions[opts.type || "default"] || {};
    // create a ref for this instance's custom element
    const customRef = React.createRef<any>();
    currentCustomRef.current = customRef;

    // If customElement is a valid React element, clone and attach ref
    const elementWithRef = React.isValidElement(opts.customElement)
      ? React.cloneElement(opts.customElement as React.ReactElement, {
          ref: customRef,
        })
      : opts.customElement;

    const finalOptions = {
      ...typeDefaults,
      ...opts,
      customElement: elementWithRef,
    };

    setOptions(finalOptions);
    setIsOpen(true);
    return new Promise<{ response: boolean; [k: string]: any }>(
      (resolve, reject) => {
        promiseRef.current = { resolve, reject };
      }
    );
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
        return Promise.resolve({ response: false });
      };
    };
  }, [showAlertResolver]); // Re-run if showAlertResolver changes (due to dependencies)

  // Handle confirm action
  const handleConfirm = async () => {
    if (!promiseRef.current) return;
    // attempt to collect values from the custom element ref if present
    let extra: Record<string, any> = {};
    try {
      const ref = currentCustomRef.current;
      if (ref?.current) {
        // prefer getValues, but accept any function or direct object
        if (typeof ref.current.getValues === "function") {
          const values = await ref.current.getValues();
          if (values && typeof values === "object") extra = values;
        } else if (typeof ref.current.getValue === "function") {
          const v = await ref.current.getValue();
          if (v && typeof v === "object") extra = v;
        } else if (typeof ref.current === "object") {
          // fallback: try to read value fields if exposed
          // (not guaranteed — custom element should expose getValues)
          if ("value" in ref.current) extra.value = ref.current.value;
        }
      }
    } catch {
      // ignore errors from custom element extraction
      // console.error("Error reading custom element values", e);
    }

    promiseRef.current.resolve({ response: true, ...(extra || {}) });
    setIsOpen(false);
    promiseRef.current = null;
    currentCustomRef.current = null;
  };

  // Handle cancel action
  const handleCancel = async () => {
    if (!promiseRef.current) return;
    // attempt to collect values from the custom element ref if present
    let extra: Record<string, any> = {};
    try {
      const ref = currentCustomRef.current;
      if (ref?.current) {
        // prefer getValues, but accept any function or direct object
        if (typeof ref.current.getValues === "function") {
          const values = await ref.current.getValues();
          if (values && typeof values === "object") extra = values;
        } else if (typeof ref.current.getValue === "function") {
          const v = await ref.current.getValue();
          if (v && typeof v === "object") extra = v;
        } else if (typeof ref.current === "object") {
          // fallback: try to read value fields if exposed
          // (not guaranteed — custom element should expose getValues)
          if ("value" in ref.current) extra.value = ref.current.value;
        }
      }
    } catch {
      // ignore errors from custom element extraction
      // console.error("Error reading custom element values", e);
    }

    promiseRef.current.resolve({ response: true, ...(extra || {}) });
    setIsOpen(false);
    promiseRef.current = null;
    currentCustomRef.current = null;
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
          {options.customElement && options.customElement}
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
