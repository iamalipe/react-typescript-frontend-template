import apiQuery from "@/hooks/use-api-query";
import { deleteKeysFromObject } from "@/lib/utils";
import { Outlet, useSearch } from "@tanstack/react-router";
import CopyMe from "./copy-me";
import CopyMeSkeleton from "./copy-me-skeleton";

const CopyMeRoot = () => {
  const searchData = useSearch({ from: "/admin/copy-me" });
  const sanitizedSearchData = deleteKeysFromObject(searchData, ["ds"]);
  const getAllCopyMeQuery = apiQuery.copyMe.useGetAll(sanitizedSearchData);
  const isLoading = getAllCopyMeQuery.isLoading;

  if (isLoading) {
    return (
      <>
        <CopyMeSkeleton />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <CopyMe rawQuery={getAllCopyMeQuery} />
      <Outlet />
    </>
  );
};

export default CopyMeRoot;
