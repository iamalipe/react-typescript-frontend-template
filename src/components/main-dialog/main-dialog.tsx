import { validateAndParse } from "@/lib/generic-validation";
import CopyMeDialog from "@/routes/private/copy-me/dialog/copy-me-dialog";
import { dialogStateZodSchema } from "@/routes/private/private-route";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

const MainDialog = () => {
  const searchParams = useSearch({
    from: "/_private",
  });
  const dialogState = useMemo(() => {
    return validateAndParse(dialogStateZodSchema, searchParams.ds);
  }, [searchParams.ds]);

  if (!dialogState) return null;

  if (dialogState?.dialog === "Copy-Me") {
    return <CopyMeDialog state={dialogState} />;
  }

  return null;
};

export default MainDialog;
