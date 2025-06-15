import { type LinkProps, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export type SortType = {
  orderBy: string;
  order: "asc" | "desc";
};

type UseSortProps = {
  initialSort?: SortType;
  onChange?: (data: SortType) => void;
  routeFrom: LinkProps["from"];
};

const useSort = (props: UseSortProps) => {
  const initialSort = props.initialSort ?? {
    orderBy: "createdAt",
    order: "desc",
  };

  const onChange = props.onChange;

  const navigate = useNavigate({ from: props.routeFrom });

  const [sorting, setSorting] = useState<SortType>(initialSort);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (onChange) onChange(sorting);

    navigate({
      search: (prev) => ({
        ...prev,
        ...sorting,
      }),
    });
  }, [sorting, onChange, navigate]);

  const onSortChange = (newSort: SortType | null) => {
    if (newSort) setSorting(newSort);
    else
      setSorting({
        orderBy: "createdAt",
        order: "desc",
      });
  };

  return { state: sorting, setSorting, onSortChange };
};

export default useSort;
