import { validateAndParse } from "@/lib/generic-validation";
import { dialogStateZodSchema } from "@/routes/private/private-route";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import CopyMeDialog from "@/routes/private/copy-me/dialog/copy-me-dialog";
import ProductDialog from "@/routes/private/product/dialog/product-dialog";

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
  if (dialogState?.dialog === "Product") {
    return <ProductDialog state={dialogState} />;
  }

  return null;
};

export default MainDialog;
