import DialogForm from "@/routes/private/product/dialog-form";
import { useProductDialogFormStore } from "@/store/use-dialog-form";

const RootDialog = () => {
  const productDialogFormOpen = useProductDialogFormStore(
    (state) => state.open
  );

  return <>{productDialogFormOpen && <DialogForm />}</>;
};

export default RootDialog;
