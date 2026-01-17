// export default AlertPopup;Assuming this path
import { AlertPopupOptions } from "./alert-popup-provider";

// --- Global Alert API Setup ---

// Interface for the functions the global API will expose
export interface AlertPopupApi {
  show: (
    options: AlertPopupOptions
  ) => Promise<{ response: boolean; [k: string]: any }>;
}

// Create a globally accessible object to hold the alert function reference.
// Initialize with a function that throws an error if called too early.
const alertPopupApi: AlertPopupApi = {
  show: () => {
    console.error("AlertDialogProvider not mounted yet.");
    // Or throw new Error("AlertDialogProvider not mounted yet.");
    return Promise.resolve({ response: false }); // Return a resolved promise to prevent crashes
  },
};

export default alertPopupApi;
