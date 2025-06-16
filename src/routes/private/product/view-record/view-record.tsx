import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/_private/product/$id");
const ViewRecord = () => {
  const routeData = routeApi.useLoaderData();
  const mainData = routeData.data.data;
  console.log("mainData", mainData);

  return <div>dasdsadasdasdd</div>;
};

export default ViewRecord;
