// export default AlertPopup;Assuming this path
import alertPopupApi from "@/components/alert-popup/alert-popup-api";
import { AlertPopupOptions } from "@/components/alert-popup/alert-popup-provider";

// --- Public AlertDialog Object ---

// The globally importable object with user-friendly methods
const alertPopup = {
  show: (options: AlertPopupOptions): Promise<boolean> => {
    // Calls the function reference stored in alertDialogApi
    return alertPopupApi.show(options);
  },
  delete: (
    options?: Omit<AlertPopupOptions, "type"> // Allow overriding description etc.
  ): Promise<boolean> => {
    return alertPopupApi.show({ ...options, type: "delete" });
  },
  info: (options?: Omit<AlertPopupOptions, "type">): Promise<boolean> => {
    return alertPopupApi.show({ ...options, type: "info" });
  },
  confirm: (options?: Omit<AlertPopupOptions, "type">): Promise<boolean> => {
    return alertPopupApi.show({ ...options, type: "default" });
  },
};

export default alertPopup;
