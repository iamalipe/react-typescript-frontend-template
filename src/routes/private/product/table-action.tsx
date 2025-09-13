import { ProductType } from "@/api/product-api";
import alertPopup from "@/components/alert-popup/alert-popup";
import { Button } from "@/components/ui";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiQuery from "@/hooks/use-api-query";
import { validateAndStringify } from "@/lib/generic-validation";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { dialogStateZodSchema } from "../private-route";

export const TableAction = ({ data }: { data: ProductType }) => {
  const navigate = useNavigate({ from: "/product" });
  const router = useRouter();
  const onView = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      id: data._id,
      mode: "VIEW",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };
  const onUpdate = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      id: data._id,
      mode: "UPDATE",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };

  const onDelete = async () => {
    const deleteRes = await alertPopup.delete();
    if (deleteRes) {
      const res = await apiQuery.product.delete(data._id);
      if (res.success) {
        toast.success(res.message || "Record Deleted");
        router.invalidate();
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={onUpdate}>Update</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TableActionContextMenu = ({ data }: { data: ProductType }) => {
  const navigate = useNavigate({ from: "/product" });
  const router = useRouter();
  const onView = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      id: data._id,
      mode: "VIEW",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };
  const onUpdate = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      id: data._id,
      mode: "UPDATE",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };

  const onDelete = async () => {
    const deleteRes = await alertPopup.delete();
    if (deleteRes) {
      const res = await apiQuery.product.delete(data._id);
      if (res.success) {
        toast.success(res.message || "Record Deleted");
        router.invalidate();
      }
    }
  };

  return (
    <ContextMenuContent>
      <ContextMenuLabel>Action</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onView}>View</ContextMenuItem>
      <ContextMenuItem onClick={onUpdate}>Update</ContextMenuItem>
      <ContextMenuItem className="text-destructive" onClick={onDelete}>
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
