import { validateAndParse } from "@/lib/generic-validation";
import { dialogStateZodSchema } from "@/routes/private-admin/private-admin-route";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import CopyMeDialogAll from "@/routes/private-admin/copy-me/dialog-all/copy-me-dialog-all";
import CopyMeDialog from "@/routes/private-admin/copy-me/dialog/copy-me-dialog";

const MainDialog = () => {
  const searchParams = useSearch({
    from: "/admin",
  });
  const dialogState = useMemo(() => {
    return validateAndParse(dialogStateZodSchema, searchParams.ds);
  }, [searchParams.ds]);

  if (!dialogState) return null;

  const isCopyMe = dialogState?.dialog === "CopyMe" || dialogState?.dialog === "Copy-Me";

  if (
    isCopyMe &&
    dialogState.mode &&
    ["CREATE", "UPDATE", "VIEW"].includes(dialogState.mode)
  ) {
    return <CopyMeDialog state={dialogState} />;
  }
  if (
    isCopyMe &&
    dialogState.mode &&
    ["VIEW-ALL"].includes(dialogState.mode)
  ) {
    return <CopyMeDialogAll state={dialogState} />;
  }

  return null;
};

export default MainDialog;
