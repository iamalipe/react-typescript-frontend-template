import { validateAndParse } from "@/lib/generic-validation";
import { dialogStateZodSchema } from "@/routes/private-admin/private-admin-route";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import ProductDialog from "@/routes/private-admin/product/dialog/product-dialog";

const MainDialog = () => {
  const searchParams = useSearch({
    from: "/admin",
  });
  const dialogState = useMemo(() => {
    return validateAndParse(dialogStateZodSchema, searchParams.ds);
  }, [searchParams.ds]);

  if (!dialogState) return null;

  if (dialogState?.dialog === "Product") {
    return <ProductDialog state={dialogState} />;
  }

  return null;
};

export default MainDialog;
