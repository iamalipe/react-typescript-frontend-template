import { ProductType } from "@/api/product-api";
import { create } from "zustand";

export type ProductDialogFormStore = {
  open: boolean;
  onClose: (newOpen: boolean) => void;
  onCloseCallback: (() => void) | null;
  onOpen: (data: ProductType | null) => void;
  data: ProductType | null;
};

export const useProductDialogFormStore = create<ProductDialogFormStore>(
  (set) => ({
    open: false,
    data: null,
    onClose: (newOpen) => set({ open: newOpen }),
    onOpen: (data) => set({ open: true, data: data }),
    onCloseCallback: null,
  })
);
